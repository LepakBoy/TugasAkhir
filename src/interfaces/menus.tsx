export interface MenuProps {
  id: string;
  price: number;
  name: string;
  category?: string | string[];
  description?: string;
  isAvailable: boolean;
  image: string;
}

export const defaultMenu: MenuProps = {
  id: "",
  name: "",
  category: "",
  price: 0,
  description: "",
  isAvailable: true,
  image: "",
};

export interface AddToCardOrderProps {
  id: string;
  idMenu: string;
  name: string;
  qty: number;
  totalPrice: number;
  image: string;
}

export const defaultCartOrder: AddToCardOrderProps = {
  id: "",
  idMenu: "",
  name: "",
  qty: 1,
  image: "",
  totalPrice: 0,
};
