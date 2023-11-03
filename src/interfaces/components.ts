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
  notificationNumber?: number;
  role: "ADMIN" | "USER" | "KITCHEN";
  ordeListNumber?: number;
}

export interface CartItemProps {
  image: string;
  idMenu: string;
  menu: string;
  qty: number;
  totalPrice: number;
  handleDeleteCart: (idMenu: string) => void;
}

export interface AccrodionComponentProps {
  child: React.ReactNode;
  title: string;
  idParent: string;
  dataTarget: string;
  titleColor?: string;
  headerStyle?: React.CSSProperties;
}
