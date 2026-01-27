import { requireNativeModule, requireNativeView } from "expo";
import { Module } from "../constants";
import type {
  ToolTipPopoverViewProps,
  ToolKitNativeModuleProps,
} from "../types";

const NativeToolKitModule = requireNativeModule<ToolKitNativeModuleProps>(
  Module.Name,
);
const NativeToolTipView = requireNativeView<ToolTipPopoverViewProps>(
  Module.Name,
  Module.View,
);

export { NativeToolKitModule, NativeToolTipView };
