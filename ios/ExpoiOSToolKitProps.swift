//
//  ExpoiOSToolKitProps.swift
//  Pods
//
//  Created by rit3zh CX on 8/3/25.
//

import ExpoModulesCore
import SwiftUI

class ExpoToolKitProps: ExpoSwiftUI.ViewProps {
    @Field var tooltip: [String: Any] = [:]
    var onActionPress = EventDispatcher()
    var onTipDismiss = EventDispatcher()
}
