import { requireNativeModule } from "expo";
import { Module } from "../constants/index";

export const ToolKitModule = requireNativeModule(Module.Name);
