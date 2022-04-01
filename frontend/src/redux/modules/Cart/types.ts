export interface ICartItem {
  product: IProduct;
  quantity: number
}
export interface ICartState {
  items: ICartItem[];
  productWithoutStock: [];
  counter: number;
  total: number;
}

export interface IProduct {
  id: number;
  brand: {
    name: string;
  }
  category: {
    name: string;
  }
  name: string;
  description: string;
  price: number;
  quantity: number;
  featured: boolean;
  img: string;
}
