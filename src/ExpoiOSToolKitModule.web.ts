import { registerWebModule, NativeModule } from 'expo';

import { ExpoiOSToolKitModuleEvents } from './ExpoiOSToolKitModule.types';

class ExpoiOSToolKitModule extends NativeModule<ExpoiOSToolKitModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoiOSToolKitModule, 'ExpoiOSToolKitModule');
