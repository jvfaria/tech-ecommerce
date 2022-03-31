import { all } from 'redux-saga/effects';
import brandSagas from './Brands/sagas';
import cartSagas from './Cart/saga';
import catalogSagas from './Catalog/sagas/sagas';
import categorySagas from './Categories/sagas';
import authSagas from './Auth/sagas';
import snackbarSagas from './Snackbar/sagas';

export default function* rootSaga(): any {
  yield all([cartSagas,
    ...catalogSagas,
    ...brandSagas,
    ...categorySagas,
    ...authSagas,
    snackbarSagas]);
}
