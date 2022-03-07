export interface IProduct {
  id: number;
  brand: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  img: string;
  featured: boolean;
}
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
