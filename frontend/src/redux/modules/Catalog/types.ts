import { IProduct } from '../Cart/types';

export interface ICatalogState {
  products: IProduct[];
  featuredProducts?: IProduct[] | [];
  filteredProducts?: IProduct[] | [];
  selectedProduct: {
    product: IProduct;
    isLoading: boolean;
  };
}

export interface IProductsCatalogResponse {
  products: IProduct[];
}

export interface IFeaturedProductsCatalogResponse {
  featuredProducts: IProduct[];
}
