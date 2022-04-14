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
  id: string;
  brand: {
    name: string;
  }
  category: {
    name: string;
  }
  stock: {
    quantity: number;
  }
  name: string;
  description: string;
  price: number;
  featured: boolean;
  image: IImage;
}

export interface IImage {
  id: string;
  name: string;
  filepath: string;
}
