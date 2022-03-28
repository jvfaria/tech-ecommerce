import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions } from 'reduxsauce';
import { ICartState } from '../types';

export const INITIAL_STATE: ICartState = {
  items: [],
  counter: 0,
  productWithoutStock: [],
  total: 0,
};

export const { Types, Creators } = createActions({
  addProductToCartRequest: ['product'],
  addProductToCartSuccess: ['product'],
  addProductToCartFail: ['productId'],
  removeProductFromCart: ['product'],
});

const addProductToCartSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, draft => {
  const { product } = action;

  // eslint-disable-next-line no-param-reassign
  draft.total += product.price;

  const existentProductIndex = state.items.findIndex(
    item => item.product.id === product.id,
  );
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

const removeProductFromCart = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, draft => {
  const cartItemIndex = state.items.findIndex(
    item => item.product.id === action.product.id,
  );

  // eslint-disable-next-line no-param-reassign
  draft.total -= action.product.price;
  // eslint-disable-next-line no-param-reassign
  draft.counter -= 1;
  if (draft.items[cartItemIndex].quantity - 1 === 0) {
    const index = draft.items.findIndex(
      cartItem => cartItem.product.id === action.product.id,
    );
    if (index !== -1) {
      draft.items.splice(index, 1);
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.items[cartItemIndex].quantity -= 1;
  }
});

const addProductToCartFail = (state = INITIAL_STATE, action: AnyAction) => produce(state, draft => {
  if (!draft.productWithoutStock.includes(action.productId as never)) {
    draft.productWithoutStock.push(action.productId as never);
  }
});

export const HANDLERS = {
  [Types.ADD_PRODUCT_TO_CART_SUCCESS]: addProductToCartSuccess,
  [Types.ADD_PRODUCT_TO_CART_FAIL]: addProductToCartFail,
  [Types.REMOVE_PRODUCT_FROM_CART]: removeProductFromCart,
};

// export const ADD_PRODUCT_TO_CART_REQUEST = 'ADD_PRODUCT_TO_CART_REQUEST';
// export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS';
// export const ADD_PRODUCT_TO_CART_FAIL = 'ADD_PRODUCT_TO_CART_FAIL';

// export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
// export const REMOVE_PRODUCT_FROM_CART_REQUEST = 'REMOVE_PRODUCT_FROM_CART_REQUEST';
// export const REMOVE_PRODUCT_FROM_CART_SUCCESS = 'REMOVE_PRODUCT_FROM_CART_SUCCESS';
// export const REMOVE_PRODUCT_FROM_CART_FAIL = 'REMOVE_PRODUCT_FROM_CART_FAIL';
// export const cartReducer: Reducer<ICartState> = (
//   state = INITIAL_STATE, action,
// // eslint-disable-next-line consistent-return
// ) => produce(state, draft => {
//   switch (action.type) {
//     case ADD_PRODUCT_TO_CART_SUCCESS: {
//       const productPayload: IProductPayload = action.payload;
//       const { product } = productPayload;

//       // eslint-disable-next-line no-param-reassign
//       draft.total += product.price;

//       const existentProductIndex = state.items.findIndex(item => item.product.id === product.id);
//       // eslint-disable-next-line no-param-reassign
//       draft.counter += 1;
//       if (existentProductIndex >= 0) {
//         // eslint-disable-next-line no-param-reassign
//         draft.items[existentProductIndex].quantity += 1;
//       } else {
//         draft.items.push({
//           product,
//           quantity: 1,
//         });
//       }

//       break;
//     }

//     case ADD_PRODUCT_TO_CART_FAIL: {
//       if (!draft.productWithoutStock.includes(action.payload.productId as never)) {
//         draft.productWithoutStock.push(action.payload.productId as never);
//       }
//       break;
//     }

//     case REMOVE_PRODUCT_FROM_CART: {
//       const cartItemIndex = state.items.findIndex(
//         item => item.product.id === action.payload.product.id,
//       );

//       // eslint-disable-next-line no-param-reassign
//       draft.total -= action.payload.product.price;
//       // eslint-disable-next-line no-param-reassign
//       draft.counter -= 1;
//       if (draft.items[cartItemIndex].quantity - 1 === 0) {
//         const index = draft.items.findIndex(
//           cartItem => cartItem.product.id === action.payload.product.id,
//         );
//         if (index !== -1) {
//           draft.items.splice(index, 1);
//         }
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         draft.items[cartItemIndex].quantity -= 1;
//       }

//       break;
//     }

//     case REMOVE_PRODUCT_FROM_CART_FAIL: {
//       if (!draft.productWithoutStock.includes(action.payload.productId as never)) {
//         draft.productWithoutStock.push(action.payload.productId as never);
//       }
//       break;
//     }

//     default: {
//       return draft;
//     }
//   }
// });

// import {
//   ADD_PRODUCT_TO_CART_REQUEST,
//   ADD_PRODUCT_TO_CART_FAIL,
//   ADD_PRODUCT_TO_CART_SUCCESS,
//   REMOVE_PRODUCT_FROM_CART,
// } from './actionTypes';

// export function addProductToCartRequest(product: IProduct) {
//   return {
//     type: ADD_PRODUCT_TO_CART_REQUEST,
//     payload: {
//       product,
//     },
//   };
// }

// export function addProductToCartSuccess(product: IProduct) {
//   return {
//     type: ADD_PRODUCT_TO_CART_SUCCESS,
//     payload: {
//       product,
//     },
//   };
// }

// export function addProductToCartFail(productId: number) {
//   return {
//     type: ADD_PRODUCT_TO_CART_FAIL,
//     payload: {
//       productId,
//     },
//   };
// }

// export function removeProductFromCart(product: IProduct) {
//   return {
//     type: REMOVE_PRODUCT_FROM_CART,
//     payload: {
//       product,
//     },
//   };
// }
