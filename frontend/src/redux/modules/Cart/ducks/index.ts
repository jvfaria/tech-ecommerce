/* eslint-disable no-param-reassign */
/* eslint-disable padded-blocks */
import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions } from 'reduxsauce';
import { ICartState } from '../types';
import { Creators as CreateSnackbarAction } from '../../Snackbar/ducks/index';

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

  removeProductAllQuantitiesFromCart: ['cartProduct'],
});

const addProductToCartSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, draft => {
  const { product } = action;
  draft.total += product.price;

  const existentProductIndex = state.items.findIndex(
    item => item.product.id === product.id,
  );
  draft.counter += 1;
  if (existentProductIndex >= 0) {
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
  draft.total -= action.product.price;
  draft.counter -= 1;
  if (draft.items[cartItemIndex].quantity - 1 === 0) {
    const index = draft.items.findIndex(
      cartItem => cartItem.product.id === action.product.id,
    );
    if (index !== -1) {
      draft.items.splice(index, 1);
    }
  } else {
    draft.items[cartItemIndex].quantity -= 1;
  }
});

const removeProductAllQuantitiesFromCart = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, draft => {
  draft.total -= action.cartProduct.product.price * action.cartProduct.quantity;
  draft.counter -= action.cartProduct.quantity;

  const index = draft.items.findIndex(
    cartItem => cartItem.product.id === action.cartProduct.product.id,
  );

  draft.items[index].quantity += action.cartProduct.quantity;
  draft.items.splice(index, 1);

  CreateSnackbarAction.enqueueSnackbar({ message: 'Produto removido do carrinho', variant: 'error' });
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
  [
  Types.REMOVE_PRODUCT_ALL_QUANTITIES_FROM_CART
  ]: removeProductAllQuantitiesFromCart,
};
