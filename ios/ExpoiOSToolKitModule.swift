import ExpoModulesCore
import TipKit

public class ExpoiOSToolKitModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoiOSToolKitModule")
      
    View(ExpoToolKitView.self)
      
      AsyncFunction("configureTips") {
          
          if #available(iOS 17.0, *) {
              
              try? Tips.configure([
                Tips.ConfigurationOption.displayFrequency(.immediate), // Show immediately
                Tips.ConfigurationOption.datastoreLocation(.applicationDefault)
              ])
          }
      }

      AsyncFunction("resetTips") {
          if #available(iOS 17.0, *) {
              try? Tips.resetDatastore()
          }
      }
  }
}
