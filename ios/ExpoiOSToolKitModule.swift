import ExpoModulesCore
import TipKit

public class ExpoiOSToolKitModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoiOSToolKitModule")
      
    View(ExpoToolKitView.self)
      
      AsyncFunction("configureTips") {
          if #available(iOS 17.0, *) {
              try? Tips.configure()
          }
      }

      AsyncFunction("resetTips") {
          if #available(iOS 17.0, *) {
              try? Tips.resetDatastore()
          }
      }
  }
}
