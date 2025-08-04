import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NativeToolKitView } from "./view/NativeView.ios";

import { ToolKitViewProps } from "./types/props";

export function ToolTipPopoverView(
  props: ToolKitViewProps
): React.ReactElement {
  return (
    <NativeToolKitView
      {...props}
      onActionPress={(event: any) => {
        props.onActionPress?.(event?.nativeEvent);
      }}
      onTipDismiss={(e: any) => {
        props.onTipDismiss?.(e.nativeEvent);
      }}
      style={[styles.wrapper, props.style]}
    >
      <View style={styles.container}>{props.children}</View>
    </NativeToolKitView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  container: {
    alignSelf: "flex-start",
    flexShrink: 1,
  },
});
