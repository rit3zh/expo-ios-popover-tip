import * as React from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface TooltipTextConfig {
  text: string;
  readonly bold?: boolean;
  readonly size?: number;
  readonly foregroundColor?: string;
}

interface TooltipAction {
  id: string;
  title: string;
}

interface TooltipImage {
  systemName: string;
}

interface TooltipConfig {
  id: string;
  title: TooltipTextConfig;
  readonly description?: TooltipTextConfig;
  readonly image?: TooltipImage;
  readonly actions?: TooltipAction[];
}

interface TipActionEvent {
  nativeEvent: {
    actionId: string;
    tipId: string;
  };
}

interface TipKitNativeEvent {
  event: string;
  tipId: string;
  reason?: string;
}

interface TipDismissEvent {
  nativeEvent: TipKitNativeEvent;
}

interface ToolTipPopoverViewProps extends React.PropsWithChildren {
  tooltip: TooltipConfig;
  isVisible: boolean;
  readonly onActionPress?: (event: TipActionEvent) => void;
  readonly onTipDismiss?: (event: TipDismissEvent) => void;
  readonly style?: StyleProp<ViewStyle>;
}

interface ToolKitNativeModuleProps {
  configureTips(): Promise<void>;
  resetTips(): Promise<void>;
  showAllTips(): Promise<void>;
  hideAllTips(): Promise<void>;
  isConfigured?: () => Promise<boolean>;
}

export type {
  TooltipTextConfig,
  TooltipAction,
  TooltipImage,
  TooltipConfig,
  TipActionEvent,
  TipDismissEvent,
  ToolTipPopoverViewProps,
  ToolKitNativeModuleProps,
};
