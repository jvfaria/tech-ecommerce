import { AxiosResponse } from 'axios';
import {
  call, put, fork, takeLatest, takeEvery, all,
} from 'redux-saga/effects';
import {
  getFeaturedProductsCatalogAxiosRequest,
  getProductByIdAxiosRequest,
  getProductsByBrandAxiosRequest,
  getProductsByCategoryAxiosRequest,
  getProductsByFiltersAxiosRequest,
  getProductsCatalogAxiosRequest,
} from '../../../services/ProductsCatalog/productsCatalog';
import { Creators as CreateAction, Types } from './ducks/index';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks/index';
import { Creators as CreateLoadingAction } from '../Loading/ducks/index';
import { IFeaturedProductsCatalogResponse, IProductsCatalogResponse } from './types';

type ActionGetProductId = ReturnType<typeof CreateAction.getProductByIdRequest>
type ActionTypeCategory = ReturnType<typeof CreateAction.getProductsByCategoryRequest>
type ActionTypeBrand = ReturnType<typeof CreateAction.getProductsByBrandRequest>
type ActionTypeProductsByName = ReturnType<typeof CreateAction.getProductsByNameRequest>

function* getProducts() {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductsCatalogAxiosRequest,
    );
    yield put(CreateAction.getProductsCatalogSuccess(response.data));
    yield put(CreateLoadingAction.loadingSuccess());
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos', variant: 'error' }));
    yield put(CreateLoadingAction.loadingSuccess());
  }
}

function* getFeaturedProducts(): any {
  try {
    const response: AxiosResponse<IFeaturedProductsCatalogResponse> = yield call(
      getFeaturedProductsCatalogAxiosRequest,
    );
    yield put(CreateAction.getFeaturedProductsCatalogSuccess(response.data));
    yield put(CreateLoadingAction.loadingSuccess());
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos em destaque', variant: 'error' }));
    yield put(CreateLoadingAction.loadingSuccess());
  }
}

function* getFilteredProductsByCategory({ category }: ActionTypeCategory) {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductsByCategoryAxiosRequest, category,
    );
    yield put(CreateAction.getProductsByCategorySuccess(response.data));
    yield put(CreateLoadingAction.loadingSuccess());
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos por categoria', variant: 'error' }));
    yield put(CreateLoadingAction.loadingSuccess());
  }
}

function* getFilteredProductsByBrand({ brand }: ActionTypeBrand) {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductsByBrandAxiosRequest, brand,
    );
    yield put(CreateAction.getProductsByBrandSuccess(response.data));
    yield put(CreateLoadingAction.loadingSuccess());
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produtos em por marca', variant: 'error' }));
    yield put(CreateLoadingAction.loadingSuccess());
  }
}

function* getProductById({ product }: ActionGetProductId) {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductByIdAxiosRequest, product.productId,
    );
    yield put(CreateAction.getProductByIdSuccess(response.data));
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar produto, produto não encontrado', variant: 'error' }));
  }
}

function* getProductsByFilters({ filters }: ActionTypeProductsByName) {
  try {
    const response: AxiosResponse<IProductsCatalogResponse> = yield call(
      getProductsByFiltersAxiosRequest, filters,
    );
    console.log(response);
    yield put(CreateAction.getProductsByFiltersSuccess(response.data));
    yield put(CreateLoadingAction.loadingSuccess());
  } catch (error) {
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao pesquisar produto', variant: 'error' }));
  }
}

export default all([
  takeLatest(Types.GET_PRODUCTS_CATALOG_REQUEST, getProducts),
  takeLatest(Types.GET_FEATURED_PRODUCTS_CATALOG_REQUEST, getFeaturedProducts),

  takeLatest(Types.GET_PRODUCTS_BY_CATEGORY_REQUEST, getFilteredProductsByCategory),
  takeLatest(Types.GET_PRODUCTS_BY_BRAND_REQUEST, getFilteredProductsByBrand),

  takeEvery(Types.GET_PRODUCT_BY_ID_REQUEST, getProductById),

  takeEvery(Types.GET_PRODUCTS_BY_FILTERS_REQUEST, getProductsByFilters),
]);
