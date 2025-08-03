import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoiOSToolKitModuleViewProps } from './ExpoiOSToolKitModule.types';

const NativeView: React.ComponentType<ExpoiOSToolKitModuleViewProps> =
  requireNativeView('ExpoiOSToolKitModule');

export default function ExpoiOSToolKitModuleView(props: ExpoiOSToolKitModuleViewProps) {
  return <NativeView {...props} />;
}
