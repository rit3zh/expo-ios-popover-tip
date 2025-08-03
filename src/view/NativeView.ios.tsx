import { requireNativeView } from "expo";
import { Module } from "../constants/index";

export const NativeToolKitView = requireNativeView(Module.Name, Module.View);
