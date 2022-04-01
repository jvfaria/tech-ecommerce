import { AxiosResponse } from 'axios';
import {
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getBrandsAxiosRequest } from '../../../services/Brands/brands';
import { Creators as CreateAction, Types } from './ducks';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks';
import { IBrand } from './types';

function* getBrands(): any {
  try {
    const response: AxiosResponse<IBrand> = yield call(getBrandsAxiosRequest);
    yield put(CreateAction.getBrandsSuccess(response.data));
  } catch (error) {
    yield put(CreateAction.getBrandsFail(error));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar marcas', variant: 'error' }));
  }
}

function* watchBrandRequest(): any {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrands);
}
const brandSagas = [fork(watchBrandRequest)];

export default brandSagas;
