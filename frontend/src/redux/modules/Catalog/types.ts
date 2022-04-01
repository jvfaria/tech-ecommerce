import { IProduct } from '../Cart/types';

export interface ICatalogState {
  products: IProduct[];
  featuredProducts?: IProduct[] | [];
}

export interface IProductsCatalogResponse {
  products: IProduct[];
}

export interface IFeaturedProductsCatalogResponse {
  featuredProducts: IProduct[];
}
