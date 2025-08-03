import ExpoModulesCore
import SwiftUI
import TipKit

@available(iOS 17.0, *)
struct DynamicTip: Tip, Identifiable {
  let id: String
  let titleText: Text
  let messageText: Text?
  let imageView: Image?
  let rawActions: [[String: String]]?
  let actionHandler: (@Sendable (String) -> Void)? // Custom handler
    
  init(data: [String: Any], actionHandler: (@Sendable (String) -> Void)? = nil) {
    self.id = data["id"] as? String ?? UUID().uuidString
    self.actionHandler = actionHandler
      
    if let title = data["title"] as? [String: Any],
       let text = title["text"] as? String {
      var t = Text(text)
      if let bold = title["bold"] as? Bool, bold { t = t.fontWeight(.bold) }
      if let size = title["size"] as? CGFloat { t = t.font(.system(size: size)) }
      if let colorHex = title["foregroundColor"] as? String,
         let color = Color(hex: colorHex) {
        t = t.foregroundColor(color)
      }
      self.titleText = t
    } else {
      self.titleText = Text("")
    }
    
    if let desc = data["description"] as? [String: Any],
       let text = desc["text"] as? String {
      var m = Text(text)
      if let bold = desc["bold"] as? Bool, bold { m = m.bold() }
      if let size = desc["size"] as? CGFloat { m = m.font(.system(size: size)) }
      if let colorHex = desc["foregroundColor"] as? String,
         let color = Color(hex: colorHex) {
        m = m.foregroundColor(color)
      }
      self.messageText = m
    } else {
      self.messageText = nil
    }
    
    if let img = data["image"] as? [String: Any],
       let systemName = img["systemName"] as? String {
      self.imageView = Image(systemName: systemName)
    } else {
      self.imageView = nil
    }
    
    self.rawActions = data["actions"] as? [[String : String]]
  }
  
  var title: Text { titleText }
  var message: Text? { messageText }
  var image: Image? { imageView }
    
  var actions: [Tip.Action] {
    rawActions?.compactMap { item in
      guard let id = item["id"],
            let title = item["title"] else { return nil }
      return Tip.Action(id: id, title: title) {
        actionHandler?(id)
      }
    } ?? []
  }
}

struct ExpoToolKitView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  let props: ExpoToolKitProps
    
  var body: some View {
    Group {
      if #available(iOS 17.0, *) {
        TipContainerView(props: props)
      } else {
        Text("Tips require iOS 17+")
      }
    }
  }
}

@available(iOS 17.0, *)
private struct TipContainerView: ExpoSwiftUIView {
  let props: ExpoToolKitProps
  @State private var currentTip: DynamicTip?
  
  var body: some View {
    let eventDispatcher = props.onActionPress
    let tipId = props.tooltip["id"] as? String ?? ""
    
    let tip = DynamicTip(data: props.tooltip) { actionId in
      // Dismiss the tip first
      Task { @MainActor in
        currentTip?.invalidate(reason: .actionPerformed)
      }
      
      // Then emit the event
      eventDispatcher([
        "actionId": actionId,
        "tipId": tipId
      ])
    }
    
    Children()
      .popoverTip(tip)
      .onAppear {
        currentTip = tip
      }
  }
}

extension Color {
  init?(hex: String?) {
    guard let hex = hex else { return nil }
    var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
    hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
    var rgb: UInt64 = 0
    guard Scanner(string: hexSanitized).scanHexInt64(&rgb) else { return nil }
    let r = Double((rgb >> 16) & 0xFF) / 255.0
    let g = Double((rgb >> 8) & 0xFF) / 255.0
    let b = Double(rgb & 0xFF) / 255.0
    self.init(red: r, green: g, blue: b)
  }
}
