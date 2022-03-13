import { all } from 'redux-saga/effects';
import cartSagas from './Cart/saga';
import catalogSagas from './Catalog/saga';

export default function* rootSaga(): any {
  yield all([cartSagas, ...catalogSagas]);
}
