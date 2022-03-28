import { AxiosResponse } from 'axios';
import {
  call, put, fork, takeLatest,
} from 'redux-saga/effects';
import { getProductsCatalog as axiosGetProductsCatalog } from '../../../../services/ProductsCatalog/productsCatalog';
import { Creators as CreateAction, Types } from '../ducks/index';
import { IProductsCatalogResponse } from '../types/types';

function* getProducts(): any {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(axiosGetProductsCatalog);
    yield put(CreateAction.getProductsCatalogSuccess(response.data));
  } catch (error) {
    console.log('error:', error);
  }
}

function* watchProductsCatalogRequest(): any {
  yield takeLatest(Types.GET_PRODUCTS_CATALOG_REQUEST, getProducts);
}

const catalogSagas = [fork(watchProductsCatalogRequest)];

export default catalogSagas;
