import { ToolKitModule } from "../module/index";

/**
 * Registers new tips for the session
 */
export async function configureTips(): Promise<void> {
  return await ToolKitModule.configureTips();
}
