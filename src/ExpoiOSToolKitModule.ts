import { NativeModule, requireNativeModule } from 'expo';

import { ExpoiOSToolKitModuleEvents } from './ExpoiOSToolKitModule.types';

declare class ExpoiOSToolKitModule extends NativeModule<ExpoiOSToolKitModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoiOSToolKitModule>('ExpoiOSToolKitModule');
