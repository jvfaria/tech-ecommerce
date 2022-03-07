import { Reducer } from 'redux';
import produce from 'immer';
import { ICartState, IProduct } from './types';
import {
  ADD_PRODUCT_TO_CART_FAIL,
  ADD_PRODUCT_TO_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_CART_FAIL,
} from './actionTypes';

interface IProductPayload {
  product: IProduct
}

const INITIAL_STATE: ICartState = {
  items: [],
  counter: 0,
  productWithoutStock: [],
  total: 0,
};

export const cartReducer: Reducer<ICartState> = (
  state = INITIAL_STATE, action,
// eslint-disable-next-line consistent-return
) => produce(state, draft => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_SUCCESS: {
      const productPayload: IProductPayload = action.payload;
      const { product } = productPayload;

      // eslint-disable-next-line no-param-reassign
      draft.total += product.price;

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

    case REMOVE_PRODUCT_FROM_CART: {
      const cartItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id,
      );

      // eslint-disable-next-line no-param-reassign
      draft.total -= action.payload.product.price;
      // eslint-disable-next-line no-param-reassign
      draft.counter -= 1;
      if (draft.items[cartItemIndex].quantity - 1 === 0) {
        const index = draft.items.findIndex(
          cartItem => cartItem.product.id === action.payload.product.id,
        );
        if (index !== -1) {
          draft.items.splice(index, 1);
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        draft.items[cartItemIndex].quantity -= 1;
      }

      break;
    }

    case REMOVE_PRODUCT_FROM_CART_FAIL: {
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
