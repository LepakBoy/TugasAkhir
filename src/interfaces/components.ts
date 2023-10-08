import React from "react";

export interface InputComponentsProps {
  type: string;
  name: string;
  value?: string;
  label?: string;
  labelFor?: string;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonComponentProps {
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type: "button" | "submit";
  backGroundColor?: string;
  textColor?: string;
}

export interface TopBarComponentProps {
  option: boolean;
  head: boolean;
}
