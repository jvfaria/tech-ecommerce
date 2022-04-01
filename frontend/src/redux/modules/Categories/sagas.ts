import { AxiosResponse } from 'axios';
import {
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getCategoriesAxiosRequest } from '../../../services/Categories/categories';
import { Creators as CreateAction, Types } from './ducks';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks';
import { ICategory } from './types';

function* getCategories(): any {
  try {
    const response: AxiosResponse<ICategory> = yield call(getCategoriesAxiosRequest);
    yield put(CreateAction.getCategoriesSuccess(response.data));
  } catch (error) {
    yield put(CreateAction.getCategoriesFail(error));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao carregar categorias', variant: 'error' }));
  }
}

function* watchCategoryRequest(): any {
  yield takeLatest(Types.GET_CATEGORIES_REQUEST, getCategories);
}
const categorySagas = [fork(watchCategoryRequest)];

export default categorySagas;
