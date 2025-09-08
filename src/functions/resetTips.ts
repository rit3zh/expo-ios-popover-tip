import { ToolKitModule } from "../module/index";

/**
 * Clears any previously shown tips
 */
export async function resetTips(): Promise<void> {
  return await ToolKitModule.resetTips();
}
