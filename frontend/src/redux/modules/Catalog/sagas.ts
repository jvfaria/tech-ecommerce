import { AxiosResponse } from 'axios';
import {
  call, put, fork, takeLatest, takeEvery, all,
} from 'redux-saga/effects';
import { getFeaturedProductsCatalogAxiosRequest, getProductsCatalogAxiosRequest } from '../../../services/ProductsCatalog/productsCatalog';
import { Creators as CreateAction, Types } from './ducks/index';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks/index';
import { IFeaturedProductsCatalogResponse, IProductsCatalogResponse } from './types';

function* getProducts(): any {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductsCatalogAxiosRequest,
    );
    yield put(CreateAction.getProductsCatalogSuccess(response.data));
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos', variant: 'error' }));
  }
}

function* getFeaturedProducts(): any {
  try {
    const response: AxiosResponse<IFeaturedProductsCatalogResponse> = yield call(
      getFeaturedProductsCatalogAxiosRequest,
    );
    yield put(CreateAction.getFeaturedProductsCatalogSuccess(response.data));
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos em destaque', variant: 'error' }));
  }
}

function* watchProductsCatalogRequest(): any {
  yield takeLatest(Types.GET_PRODUCTS_CATALOG_REQUEST, getProducts);
}

function* watchFeaturedProductsCatalogRequest(): any {
  yield takeLatest(Types.GET_FEATURED_PRODUCTS_CATALOG_REQUEST, getFeaturedProducts);
}

const catalogSagas = [fork(watchProductsCatalogRequest), fork(watchFeaturedProductsCatalogRequest)];

export default catalogSagas;
