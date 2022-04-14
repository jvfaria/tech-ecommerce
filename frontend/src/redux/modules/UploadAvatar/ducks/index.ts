import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  file: {} as FormData,
  avatar: {} as IAvatar,
};

interface IAvatar {
  fileDownloadUri: string;
  fileName: string;
  fileType: string;
  size: number;
}

export default createTypes(`
  UPLOAD_AVATAR_REQUEST
  UPLOAD_AVATAR_SUCCESS
  UPLOAD_AVATAR_FAIL

  GET_AVATAR_REQUEST
  GET_AVATAR_SUCCESS
`);

export const { Types, Creators } = createActions({
  uploadAvatarRequest: ['file'],
  uploadAvatarSuccess: ['file'],
  uploadAvatarFail: ['error'],

  getAvatarRequest: ['fileName'],
  getAvatarSuccess: ['avatar'],
});

const uploadAvatarSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.file = action.file;
  localStorage.setItem('@TechEcommerce:avatar', JSON.stringify(action.file));
});

const getAvatarSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.avatar = action.avatar;
});

export const HANDLERS = {
  [Types.UPLOAD_AVATAR_SUCCESS]: uploadAvatarSuccess,
  [Types.GET_AVATAR_SUCCESS]: getAvatarSuccess,
};
