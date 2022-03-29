import { all } from 'redux-saga/effects';
import brandSagas from './Brands/sagas';
import cartSagas from './Cart/saga';
import catalogSagas from './Catalog/sagas/sagas';
import categorySagas from './Categories/sagas';

export default function* rootSaga(): any {
  yield all([cartSagas, ...catalogSagas, ...brandSagas, ...categorySagas]);
}
