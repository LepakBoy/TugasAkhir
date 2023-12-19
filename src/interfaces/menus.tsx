export interface MenuProps {
  id: string;
  price: number;
  name: string;
  category: string;
  description: string;
  isAvailable: boolean;
  image: string;
  servingTime: number;
}

export const defaultMenu: MenuProps = {
  id: "",
  name: "",
  category: "",
  price: 0,
  description: "",
  isAvailable: true,
  image: "",
  servingTime: 0,
};

export interface AddToCardOrderProps {
  id: string;
  menuId: string;
  name: string;
  qty: number;
  totalPrice: number;
  image: string;
}

export const defaultCartOrder: AddToCardOrderProps = {
  id: "",
  menuId: "",
  name: "",
  qty: 1,
  image: "",
  totalPrice: 0,
};
