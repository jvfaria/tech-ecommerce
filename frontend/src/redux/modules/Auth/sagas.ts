import { AxiosResponse } from 'axios';
import {
  call, fork, put, takeLatest,
} from 'redux-saga/effects';
import { getAuthAxiosRequest } from '../../../services/Auth/auth';
import { Creators as CreateAction, Types } from './ducks';

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

    console.log('RESPONSE:', response);

    yield put(CreateAction.getUserLoginSuccess(response.data));
  } catch (error) {
    console.log('Authentication error');
    yield put(CreateAction.getUserLoginFail('Authentication error'));
  }
}

function* watchUserLogin(): any {
  yield takeLatest(Types.GET_USER_LOGIN_REQUEST, getUserLogin);
}

const authSagas = [fork(watchUserLogin)];

export default authSagas;
