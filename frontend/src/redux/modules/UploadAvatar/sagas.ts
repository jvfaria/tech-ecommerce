import { AxiosResponse } from 'axios';
import {
  call, fork, put, takeLatest,
} from 'redux-saga/effects';
import { getAvatarAxiosRequest, uploadAvatarAxiosRequest } from '../../../services/AvatarUpload/avatarUpload';
import { Creators as CreateAction, Types } from './ducks';

interface IAvatarUploadResponse {
  filePath: string;
}

function* uploadAvatar(action: any) {
  try {
    console.log('action', action);
    const response: AxiosResponse<IAvatarUploadResponse> = yield call(
      uploadAvatarAxiosRequest, action.file,
    );
    console.log('RESPONSE UPLOAD', response);
    yield put(CreateAction.uploadAvatarSuccess(response.data));
  } catch (error) {
    console.log('Erro ao fazer upload');
  }
}

function* getAvatar(action: any) {
  try {
    const response: AxiosResponse<IAvatarUploadResponse> = yield call(
      getAvatarAxiosRequest, action.avatar.fileName,
    );
    console.log('RESPONSE GET AVATAR', response);
    yield put(CreateAction.getAvatarSuccess(response.data));
  } catch (error) {
    console.log('Erro ao carregar avatar');
  }
}

function* watchUploadAvatar() {
  yield takeLatest(Types.UPLOAD_AVATAR_REQUEST, uploadAvatar);
}

function* watchGetAvatar() {
  yield takeLatest(Types.GET_AVATAR_REQUEST, getAvatar);
}

const avatarUploadSagas = [fork(watchUploadAvatar), fork(watchGetAvatar)];

export default avatarUploadSagas;
