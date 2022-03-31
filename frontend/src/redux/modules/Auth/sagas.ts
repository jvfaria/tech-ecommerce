import { AxiosResponse } from 'axios';
import {
  call, fork, put, takeLatest,
} from 'redux-saga/effects';
import { getAuthAxiosRequest } from '../../../services/Auth/auth';
import { Creators as CreateAction, Types } from './ducks';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks';

type ActionType = ReturnType<typeof CreateAction.getUserLoginRequest>

interface IAuthResponse {
  token: string;
}

function* getUserLogin({ email, password }: ActionType): any {
  try {
    console.log('action', email, password);

    const response: AxiosResponse<IAuthResponse> = yield call(
      getAuthAxiosRequest, email, password,
    );

    yield put(CreateAction.getUserLoginSuccess(response.data));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Login efetuado com sucesso !', variant: 'success' }));
  } catch (error) {
    console.log('Authentication error');
    yield put(CreateAction.getUserLoginFail('Authentication error'));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: 'Erro ao tentar fazer login !', variant: 'error' }));
  }
}

function* watchUserLogin(): any {
  yield takeLatest(Types.GET_USER_LOGIN_REQUEST, getUserLogin);
}

const authSagas = [fork(watchUserLogin)];

export default authSagas;
