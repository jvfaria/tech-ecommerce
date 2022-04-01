import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  products: [],
  featuredProducts: [],
};

export default createTypes(`
  GET_PRODUCTS_CATALOG_REQUEST
  GET_PRODUCTS_CATALOG_SUCCESS
  GET_PRODUCTS_CATALOG_FAIL

  GET_FEATURED_PRODUCTS_CATALOG_REQUEST
  GET_FEATURED_PRODUCTS_CATALOG_SUCCESS
  GET_FEATURED_PRODUCTS_CATALOG_FAIL
`);

export const { Types, Creators } = createActions({
  getProductsCatalogRequest: [],
  getProductsCatalogSuccess: ['products'],
  getProductsCatalogFail: [],
  getFeaturedProductsCatalogRequest: [],
  getFeaturedProductsCatalogSuccess: ['featuredProducts'],
  getFeaturedProductsCatalogFail: [],
});

const getProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.products.length === 0) {
    draft.products.push(...action.products as never[]);
  }
});

const getFeaturedProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  console.log('featured put:', state, action);
  if (state.featuredProducts.length === 0) {
    draft.featuredProducts.push(...action.featuredProducts as never[]);
  }
});

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_PRODUCTS_CATALOG_SUCCESS]: getProductsCatalogSuccess,
  [Types.GET_FEATURED_PRODUCTS_CATALOG_SUCCESS]: getFeaturedProductsCatalogSuccess,
};
