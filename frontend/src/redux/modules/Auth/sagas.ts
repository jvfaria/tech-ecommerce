import { AxiosResponse } from 'axios';
import {
  all,
  call, put, takeLatest,
} from 'redux-saga/effects';
import { getAuthAxiosRequest, registerUserAxiosRequest } from '../../../services/Auth/auth';
import { Creators as CreateAction, Types } from './ducks';
import { Creators as CreateSnackbarAction } from '../Snackbar/ducks';
import { IAuthResponse } from './types';

type ActionTypeLogin = ReturnType<typeof CreateAction.getUserLoginRequest>
type ActionTypeRegister = ReturnType<typeof CreateAction.registerUserRequest>

function* getUserLogin({ email, password }: ActionTypeLogin): any {
  try {
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

function* registerUser({ data }: ActionTypeRegister): any {
  try {
    yield call(
      registerUserAxiosRequest, data,
    );
    yield put(CreateSnackbarAction.enqueueSnackbar({
      message: 'Cadastro efetuado com sucesso ! Faça login com suas credenciais',
      variant: 'success',
    }));
  } catch (error: any) {
    yield put(CreateAction.registerUserFail(error));
    yield put(CreateSnackbarAction.enqueueSnackbar({ message: error.response.data.message, variant: 'error' }));
  }
}

export default all([
  takeLatest(Types.GET_USER_LOGIN_REQUEST, getUserLogin),
  takeLatest(Types.REGISTER_USER_REQUEST, registerUser),
]);
