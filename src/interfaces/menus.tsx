export interface MenuProps {
  price: number;
  name: string;
  category?: string | string[];
  description?: string;
}

export const defaultMenu: MenuProps = {
  name: "",
  category: "",
  price: 0,
  description: "",
};

export interface AddToCardOrderProps {
  name: string;
  qty: number;
  totalPrice: number;
}

export const defaultCartOrder: AddToCardOrderProps = {
  name: "",
  qty: 1,
  totalPrice: 0,
};
