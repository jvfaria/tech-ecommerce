import {
  all, put, select, takeEvery,
} from 'redux-saga/effects';
import { Creators as CreateAction, Types } from './ducks';

function* enqueueSnackbarSaga(action: any): any {
  yield put(CreateAction.enqueueSnackbar(action.key, action.message));
}

function* closeSnackbarSaga(action: any): any {
  // const snackbar = yield select(CreateAction.getSnackbarByKey(action.key));

  yield put(CreateAction.closeSnackbar(action.key, { ...action.snackbar, dismissed: true }));
}

export default function* rootSaga() {
  yield all([
    takeEvery(Types.ENQUEUE_SNACKBAR, enqueueSnackbarSaga),
    takeEvery(Types.ENQUEUE_SNACKBAR, closeSnackbarSaga),
  ]);
}
