import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  products: [],
};

export default createTypes(`
  GET_PRODUCTS_CATALOG_REQUEST
  GET_PRODUCTS_CATALOG_SUCCESS
  GET_PRODUCTS_CATALOG_FAIL
`);

export const { Types, Creators } = createActions({
  getProductsCatalogRequest: [],
  getProductsCatalogSuccess: ['products'],
  getProductsCatalogFail: [],
});

const getProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.products.length === 0) {
    draft.products.push(...action.products as never[]);
  }
});
// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_PRODUCTS_CATALOG_SUCCESS]: getProductsCatalogSuccess,
};

// export const catalogReducer: Reducer<ICatalogState> = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case Types.GET_PRODUCTS_CATALOG_SUCCESS: {

//     }

//     default: {
//       return state;
//     }
//   }
// };

// export const Types = {
//   GET_PRODUCTS_CATALOG_REQUEST: 'todos/GET_PRODUCTS_CATALOG_REQUEST',
//   GET_PRODUCTS_CATALOG_SUCCESS: 'todos/GET_PRODUCTS_CATALOG_SUCCESS',
//   GET_PRODUCTS_CATALOG_FAIL: 'todos/GET_PRODUCTS_CATALOG_FAIL',
// };

// export const Creators = {
//   getProductsCatalogRequest: () => ({
//     type: Types.GET_PRODUCTS_CATALOG_REQUEST,
//   }),

//   getProductsCatalogSuccess: (products: ICatalogState) => ({
//     type: Types.GET_PRODUCTS_CATALOG_SUCCESS,
//     payload: { products },
//   }),

//   getProductsCatalogFail: (productId: number) => ({
//     type: Types.GET_PRODUCTS_CATALOG_FAIL,
//     payload: { productId },
//   }),

// };
