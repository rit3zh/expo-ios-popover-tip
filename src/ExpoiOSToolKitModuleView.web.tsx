import * as React from 'react';

import { ExpoiOSToolKitModuleViewProps } from './ExpoiOSToolKitModule.types';

export default function ExpoiOSToolKitModuleView(props: ExpoiOSToolKitModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
