export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface BasketProductType {
  _id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

export interface BasketSliceStateType {
  items: BasketProductType[];
}

export interface OrderType {
  _id: string,
  order_id: string,
  payment_intent: string,
  amount: number,
  images: string[],
  email: string,
  date: string
}