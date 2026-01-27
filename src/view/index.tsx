import * as React from "react";
import { ToolTipPopoverViewProps } from "../types";
import { StyleSheet } from "react-native";
import { NativeToolTipView } from "../native-view";

const ToolTipView: React.FC<ToolTipPopoverViewProps> &
  React.FunctionComponent<ToolTipPopoverViewProps> = ({
  tooltip,
  isVisible,
  onActionPress,
  onTipDismiss,
  children,
  ...props
}: ToolTipPopoverViewProps):
  | (React.ReactNode & React.JSX.Element & React.ReactElement)
  | null => {
  return (
    <NativeToolTipView
      tooltip={tooltip}
      isVisible={isVisible}
      onActionPress={onActionPress}
      onTipDismiss={onTipDismiss}
      style={[styles.container]}
      {...props}
    >
      {children}
    </NativeToolTipView>
  );
};

export { ToolTipView };

const styles = StyleSheet.create({
  container: {
    // overflow: "hidden",
  },
});
