import { AxiosResponse } from 'axios';
import {
  call, put, fork, takeLatest,
} from 'redux-saga/effects';
import { getProductsCatalog as axiosGetProductsCatalog } from '../../../services/ProductsCatalog/productsCatalog';
import {
  getProductsCatalogSuccess as actionGetProductsCatalogSuccess,
} from './actions';
import { GET_PRODUCTS_CATALOG_REQUEST } from './actionTypes';
import { IProductsCatalogResponse } from './types';

function* getProducts(): any {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(axiosGetProductsCatalog);
    yield put(actionGetProductsCatalogSuccess(response.data));
  } catch (error) {
    console.log('error:', error);
  }
}

function* watchProductsCatalogRequest(): any {
  yield takeLatest(GET_PRODUCTS_CATALOG_REQUEST, getProducts);
}

const catalogSagas = [fork(watchProductsCatalogRequest)];

export default catalogSagas;
