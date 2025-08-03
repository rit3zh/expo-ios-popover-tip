import * as React from "react";
import { NativeToolKitView } from "./view/NativeView.ios";
import { StyleProp, ViewStyle } from "react-native";
import { ToolTip } from "./types/tip";
import { Actions } from "./types/actions";
interface ToolKitViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  tooltip?: ToolTip;
  onActionPress?: (actions: Actions) => any;
}

export function ToolKitView(props: ToolKitViewProps): React.ReactElement {
  return (
    <NativeToolKitView
      {...props}
      onActionPress={(event: any) => {
        if (props.onActionPress) {
          props.onActionPress(event?.nativeEvent);
        }
      }}
    />
  );
}
