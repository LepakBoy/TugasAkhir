export interface MenuProps {
  id: string;
  price: number;
  name: string;
  category?: string | string[];
  description?: string;
  isAvailable: boolean;
}

export const defaultMenu: MenuProps = {
  id: "",
  name: "",
  category: "",
  price: 0,
  description: "",
  isAvailable: true,
};

export interface AddToCardOrderProps {
  id: string;
  idMenu: string;
  name: string;
  qty: number;
  totalPrice: number;
}

export const defaultCartOrder: AddToCardOrderProps = {
  id: "",
  idMenu: "",
  name: "",
  qty: 1,
  totalPrice: 0,
};
