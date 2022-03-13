import { AxiosResponse } from 'axios';
import {
  all, takeLatest, select, call, put,
} from 'redux-saga/effects';
import { api } from '../../../services/api';
import { IState } from '../../store';
import {
  addProductToCartFail, addProductToCartRequest, addProductToCartSuccess,
} from './actions';
import { ADD_PRODUCT_TO_CART_REQUEST } from './actionTypes';

type ActionType = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: ActionType): any {
  const { product } = payload;
  const currentQuantity: number = yield select(
    (state: IState) => state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0,
  );

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFail(product.id));
  }
}

export default all([
  takeLatest(ADD_PRODUCT_TO_CART_REQUEST, checkProductStock),
]);
