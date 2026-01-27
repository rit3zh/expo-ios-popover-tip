import ExpoModulesCore
import UIKit
import TipKit
import SwiftUI

@available(iOS 17.0, *)
class TipStatusTracker {
    static let shared = TipStatusTracker()
    
    private let userDefaultsKey = "expo_tipkit_shown_tips"
    
    private var shownTipIds: Set<String> {
        get {
            let array = UserDefaults.standard.stringArray(forKey: userDefaultsKey) ?? []
            return Set(array)
        }
        set {
            UserDefaults.standard.set(Array(newValue), forKey: userDefaultsKey)
        }
    }
    
    func markAsShown(_ tipId: String) {
        var current = shownTipIds
        current.insert(tipId)
        shownTipIds = current
    }
    
    func hasBeenShown(_ tipId: String) -> Bool {
        return shownTipIds.contains(tipId)
    }
    
    func reset() {
        UserDefaults.standard.removeObject(forKey: userDefaultsKey)
    }
}

@available(iOS 17.0, *)
struct DynamicTip: Tip, Identifiable {
    let id: String
    let titleText: String
    let messageText: String?
    let systemImageName: String?
    let rawActions: [[String: String]]?
    var actionHandler: (@Sendable (String) -> Void)?
    
    init(data: [String: Any], actionHandler: (@Sendable (String) -> Void)? = nil) {
        self.id = data["id"] as? String ?? UUID().uuidString
        self.actionHandler = actionHandler
        
        if let title = data["title"] as? [String: Any],
           let text = title["text"] as? String {
            self.titleText = text
        } else {
            self.titleText = ""
        }
        
        if let desc = data["description"] as? [String: Any],
           let text = desc["text"] as? String {
            self.messageText = text
        } else {
            self.messageText = nil
        }
        
        if let img = data["image"] as? [String: Any] {
            self.systemImageName = img["systemName"] as? String
        } else {
            self.systemImageName = nil
        }
        
        self.rawActions = data["actions"] as? [[String: String]]
    }
    
    var title: Text {
        Text(titleText)
    }
    
    var message: Text? {
        guard let msg = messageText else { return nil }
        return Text(msg)
    }
    
    var image: Image? {
        guard let name = systemImageName else { return nil }
        return Image(systemName: name)
    }
    
    var actions: [Tip.Action] {
        rawActions?.compactMap { item in
            guard let actionId = item["id"],
                  let actionTitle = item["title"] else { return nil }
            return Tip.Action(id: actionId, title: actionTitle) {
                actionHandler?(actionId)
                self.invalidate(reason: .actionPerformed)
            }
        } ?? []
    }
}
public final class ExpoToolKitView: ExpoView, UIPopoverPresentationControllerDelegate {
    var tooltip: [String: Any] = [:] {
        didSet {
            handleTooltipChange()
        }
    }
    
    var isVisible: Bool = false {
        didSet {
            handleVisibilityChange()
        }
    }
    
    let onActionPress = EventDispatcher()
    let onTipDismiss = EventDispatcher()
    private var childrenContainer: UIView!
    private weak var presentedController: UIViewController?
    private var currentTipId: String?
    private var hasShownTip: Bool = false
    private var observationTask: Task<Void, Never>?
    
    public required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        setupView()
    }
    
    private func setupView() {
        childrenContainer = UIView()
        childrenContainer.backgroundColor = .clear
        addSubview(childrenContainer)
    }
    
    public override func layoutSubviews() {
        super.layoutSubviews()
        childrenContainer.frame = bounds
        
        for subview in childrenContainer.subviews {
            subview.frame = childrenContainer.bounds
        }
    }
    public override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        childrenContainer.insertSubview(childComponentView, at: index)
        setNeedsLayout()
    }
    
    public override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        childComponentView.removeFromSuperview()
    }
    
    private func handleTooltipChange() {
        let newTipId = tooltip["id"] as? String ?? ""
        
        if newTipId != currentTipId {
            currentTipId = newTipId
            hasShownTip = false
            dismissTipIfNeeded()
        }
    }
    
    private func handleVisibilityChange() {
        if isVisible && !hasShownTip {
            showTip()
        } else if !isVisible {
            dismissTipIfNeeded()
            hasShownTip = false
        }
    }
    private func showTip() {
        guard #available(iOS 17.0, *) else { return }
        guard presentedController == nil else { return }
        guard let parentVC = findViewController() else { return }
        
        let tipId = tooltip["id"] as? String ?? ""
        if TipStatusTracker.shared.hasBeenShown(tipId) {
            onTipDismiss([
                "event": "tipAlreadyShown",
                "tipId": tipId,
                "reason": "alreadyDisplayed"
            ])
            return
        }
        
        let tip = DynamicTip(data: tooltip) { @Sendable [weak self] actionId in
            DispatchQueue.main.async {
                self?.handleActionPress(actionId: actionId, tipId: tipId)
            }
        }
        
        hasShownTip = true
        TipStatusTracker.shared.markAsShown(tipId)
        
        let tipVC = TipUIPopoverViewController(tip, sourceItem: childrenContainer)
        tipVC.modalPresentationStyle = .popover
        
        if let popover = tipVC.popoverPresentationController {
            popover.sourceView = childrenContainer
            popover.sourceRect = childrenContainer.bounds
            popover.permittedArrowDirections = [.up, .down]
            popover.delegate = self
        }
        
        presentedController = tipVC
        
        // Observe tip status for close button / invalidation
        observationTask?.cancel()
        observationTask = Task { [weak self] in
            for await status in tip.statusUpdates {
                if case .invalidated(let reason) = status {
                    await MainActor.run {
                        self?.handleTipInvalidated(tipId: tipId, reason: reason)
                    }
                    break
                }
            }
        }
        
        parentVC.present(tipVC, animated: true)
    }
    
    private func dismissTipIfNeeded() {
        observationTask?.cancel()
        observationTask = nil
        
        if let controller = presentedController {
            controller.dismiss(animated: true)
            presentedController = nil
        }
    }
    
    @available(iOS 17.0, *)
    private func handleTipInvalidated(tipId: String, reason: Tips.InvalidationReason) {
        presentedController?.dismiss(animated: true)
        presentedController = nil
        observationTask?.cancel()
        observationTask = nil
        
        let reasonString: String
        switch reason {
        case .actionPerformed:
            reasonString = "actionPerformed"
        case .displayCountExceeded:
            reasonString = "displayCountExceeded"
        case .tipClosed:
            reasonString = "tipClosed"
        case .displayDurationExceeded:
            reasonString = "durationExceeded"
        @unknown default:
            reasonString = "unknown"
        }
        
        onTipDismiss([
            "event": "tipDismissed",
            "tipId": tipId,
            "reason": reasonString
        ])
    }
    
    private func handleActionPress(actionId: String, tipId: String) {
        observationTask?.cancel()
        observationTask = nil
        presentedController?.dismiss(animated: true)
        presentedController = nil
        
        onActionPress([
            "actionId": actionId,
            "tipId": tipId
        ])
        
        onTipDismiss([
            "event": "tipDismissed",
            "tipId": tipId,
            "reason": "actionPerformed"
        ])
    }
    
    private func findViewController() -> UIViewController? {
        var responder: UIResponder? = self
        while let next = responder?.next {
            if let vc = next as? UIViewController { return vc }
            responder = next
        }
        return nil
    }
    
    public func adaptivePresentationStyle(for controller: UIPresentationController) -> UIModalPresentationStyle {
        return .none
    }
    
    public func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    public func presentationControllerDidDismiss(_ presentationController: UIPresentationController) {
        observationTask?.cancel()
        observationTask = nil
        
        let tipId = tooltip["id"] as? String ?? ""
        onTipDismiss([
            "event": "tipDismissed",
            "tipId": tipId,
            "reason": "userDismissed"
        ])
        presentedController = nil
    }
}
