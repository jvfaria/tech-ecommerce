import { AxiosResponse } from 'axios';
import {
  all, takeLatest, select, call, put,
} from 'redux-saga/effects';
import { api } from '../../../services/api';
import { IState } from '../../store';
import {
  Creators as CreateAction, Types,
} from './ducks';
import {
  Creators as CreateSnackbarAction,
} from '../Snackbar/ducks';

type ActionType = ReturnType<typeof CreateAction.addProductToCartRequest>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ product }: ActionType): any {
  const currentQuantity: number = yield select(
    (state: IState) => state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0,
  );

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `/stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(CreateAction.addProductToCartSuccess(product));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: `Produto ${product.name} adicionado ao carrinho`, variant: 'success' }));
  } else {
    yield put(CreateAction.addProductToCartFail(product.id));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: `Produto ${product.name} não tem quantidade suficiente em estoque`, variant: 'error' }));
  }
}

export default all([
  takeLatest(Types.ADD_PRODUCT_TO_CART_REQUEST, checkProductStock),
]);
