import { requireNativeModule } from "expo";
import { Module } from "../constants/index";
import type { ToolKitNativeModuleProps } from "../types/index";

const ToolKitModule = requireNativeModule<Required<ToolKitNativeModuleProps>>(
  Module.Name,
);

export { ToolKitModule };
