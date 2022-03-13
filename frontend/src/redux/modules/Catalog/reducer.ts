import produce from 'immer';
import { Reducer } from 'redux';
import { GET_PRODUCTS_CATALOG_SUCCESS } from './actionTypes';
import { ICatalogState } from './types';

const INITIAL_STATE = {
  products: [],
};

export const catalogReducer: Reducer<ICatalogState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_CATALOG_SUCCESS: {
      return produce(state, (draft) => {
        if (state.products.length === 0) {
          draft.products.push(...action.payload.products);
        }
      });
    }

    default: {
      return state;
    }
  }
};
