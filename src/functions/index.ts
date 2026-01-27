import { NativeToolKitModule } from "../native-view";

export async function configureTips(): Promise<void> {
  return NativeToolKitModule.configureTips();
}

export async function resetTips(): Promise<void> {
  return NativeToolKitModule.resetTips();
}

export async function showAllTips(): Promise<void> {
  return NativeToolKitModule.showAllTips();
}

export async function hideAllTips(): Promise<void> {
  return NativeToolKitModule.hideAllTips();
}

export async function isConfigured(): Promise<boolean> {
  return NativeToolKitModule?.isConfigured!();
}
