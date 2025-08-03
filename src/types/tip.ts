export interface TipActions {
  id: string;
  title: string;
}

export interface Title {
  text: string;
  foregroundColor?: string;
  size?: number;
  bold?: boolean;
}

export interface Description {
  text: string;
  foregroundColor?: string;
  size?: number;
  bold?: boolean;
}
export interface Image {
  systemName?: string;
}

export interface ToolTip {
  id: string;
  title: Title;
  image?: Image;
  description?: Description;
  actions?: TipActions[];
}
