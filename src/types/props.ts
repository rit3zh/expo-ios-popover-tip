import { StyleProp, ViewStyle } from "react-native";
import { ToolTip } from "./tip";
import { Actions } from "./actions";

export interface ToolKitViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  tooltip?: ToolTip;
  onActionPress?: (actions: Actions) => any;
  onTipDismiss?: (tip: Omit<Actions, "actionId">) => void;
}
