import { Reducer } from 'redux';
import produce from 'immer';
import { ICartState, IProduct } from './types';

interface IProductPayload {
  product: IProduct
}
const INITIAL_STATE: ICartState = {
  items: [],
  counter: 0,
};

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const productPayload: IProductPayload = action.payload;
      const { product } = productPayload;

      const existentProductIndex = state.items.findIndex(item => item.product.id === product.id);

      return produce(state, (draft) => {
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
      });
    }

    default: {
      return state;
    }
  }
};
