import { AxiosResponse } from 'axios';
import {
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getCategoriesAxiosRequest } from '../../../services/Categories/categories';
import { Creators as CreateAction, Types } from './ducks';
import { ICategory } from './types';

function* getCategories(): any {
  try {
    const response: AxiosResponse<ICategory> = yield call(getCategoriesAxiosRequest);
    yield put(CreateAction.getCategoriesSuccess(response.data));
  } catch (error) {
    yield put(CreateAction.getCategoriesFail(error));
  }
}

function* watchCategoryRequest(): any {
  yield takeLatest(Types.GET_CATEGORIES_REQUEST, getCategories);
}
const categorySagas = [fork(watchCategoryRequest)];

export default categorySagas;
