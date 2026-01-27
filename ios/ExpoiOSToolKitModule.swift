import ExpoModulesCore
import TipKit

public class ExpoiOSToolKitModule: Module {
    
    private static var isConfigured = false
    
    public func definition() -> ModuleDefinition {
        Name("ExpoiOSToolKitModule")
        
        View(ExpoToolKitView.self) {
            Events("onActionPress", "onTipDismiss")
            
            Prop("tooltip") { (view: ExpoToolKitView, value: [String: Any]) in
                view.tooltip = value
            }
            
            Prop("isVisible") { (view: ExpoToolKitView, value: Bool) in
                view.isVisible = value
            }
        }
        
        AsyncFunction("configureTips") {
            if #available(iOS 17.0, *) {
                guard !ExpoiOSToolKitModule.isConfigured else { return }
                
                try? Tips.configure([
                    .displayFrequency(.immediate),
                    .datastoreLocation(.applicationDefault)
                ])
                
                ExpoiOSToolKitModule.isConfigured = true
            }
        }
        
      
        AsyncFunction("resetTips") {
            if #available(iOS 17.0, *) {
                try? Tips.resetDatastore()
                
                TipStatusTracker.shared.reset()
                
                ExpoiOSToolKitModule.isConfigured = false
            }
        }
        
        AsyncFunction("showAllTips") {
            if #available(iOS 17.0, *) {
                Tips.showAllTipsForTesting()
            }
        }
        
        AsyncFunction("hideAllTips") {
            if #available(iOS 17.0, *) {
                Tips.hideAllTipsForTesting()
            }
        }
        
        Function("isConfigured") {
            return ExpoiOSToolKitModule.isConfigured
        }
    }
}
