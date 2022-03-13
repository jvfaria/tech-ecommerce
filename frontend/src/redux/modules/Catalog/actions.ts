import {
  GET_PRODUCTS_CATALOG_REQUEST,
  GET_PRODUCTS_CATALOG_FAIL,
  GET_PRODUCTS_CATALOG_SUCCESS,
} from './actionTypes';
import { ICatalogState } from './types';

export const getProductsCatalogRequest = () => ({
  type: GET_PRODUCTS_CATALOG_REQUEST,
});

export const getProductsCatalogSuccess = (products: ICatalogState) => ({
  type: GET_PRODUCTS_CATALOG_SUCCESS,
  payload: { products },
});

export function getProductsCatalogFail(productId: number) {
  return {
    type: GET_PRODUCTS_CATALOG_FAIL,
    payload: { productId },
  };
}
