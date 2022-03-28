import { AxiosResponse } from 'axios';
import {
  all, takeLatest, select, call, put,
} from 'redux-saga/effects';
import { api } from '../../../services/api';
import { IState } from '../../store';
import {
  Creators as CreateAction, Types,
} from './ducks';

type ActionType = ReturnType<typeof CreateAction.addProductToCartRequest>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ product }: ActionType): any {
  const currentQuantity: number = yield select(
    (state: IState) => state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0,
  );

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(CreateAction.addProductToCartSuccess(product));
  } else {
    yield put(CreateAction.addProductToCartFail(product.id));
  }
}

export default all([
  takeLatest(Types.ADD_PRODUCT_TO_CART_REQUEST, checkProductStock),
]);
