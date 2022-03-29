import { IProduct } from '../../Cart/types';

export interface ICatalogState {
  products: IProduct[]
}

export interface IProductsCatalogResponse {
  products: IProduct[];
}
