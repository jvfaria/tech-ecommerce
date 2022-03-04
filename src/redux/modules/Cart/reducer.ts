import { Reducer } from 'redux';
import produce from 'immer';
import { ICartState, IProduct } from './types';
import { ADD_PRODUCT_TO_CART_FAIL, ADD_PRODUCT_TO_CART_SUCCESS } from './actionTypes';

interface IProductPayload {
  product: IProduct
}

const INITIAL_STATE: ICartState = {
  items: [],
  counter: 0,
  productWithoutStock: [],
};

export const cartReducer: Reducer<ICartState> = (
  state = INITIAL_STATE, action,
// eslint-disable-next-line consistent-return
) => produce(state, draft => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_SUCCESS: {
      const productPayload: IProductPayload = action.payload;
      const { product } = productPayload;

      const existentProductIndex = state.items.findIndex(item => item.product.id === product.id);
      // eslint-disable-next-line no-param-reassign
      draft.counter += 1;
      if (existentProductIndex >= 0) {
        // eslint-disable-next-line no-param-reassign
        draft.items[existentProductIndex].quantity += 1;
      } else {
        draft.items.push({
          product,
          quantity: 1,
        });
      }

      break;
    }

    case ADD_PRODUCT_TO_CART_FAIL: {
      if (!draft.productWithoutStock.includes(action.payload.productId as never)) {
        draft.productWithoutStock.push(action.payload.productId as never);
      }
      break;
    }

    default: {
      return draft;
    }
  }
});
