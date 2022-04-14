/* eslint-disable no-param-reassign */
import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  user: {
    username: '',
    token: '',
    authorities: [] as string[],
  },
};

export default createTypes(`
  GET_USER_LOGIN_REQUEST
  GET_USER_LOGIN_SUCCESS
  GET_USER_LOGIN_FAIL
  GET_USER_LOCAL_STORAGE_CREDENTIALS

  LOGOUT_USER
`);

export const { Types, Creators } = createActions({
  getUserLoginRequest: ['email', 'password'],
  getUserLoginSuccess: ['user'],
  getUserLoginFail: ['error'],

  getUserLocalStorageCredentials: [],

  logoutUser: ['user'],
});

const getLoginSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  draft.user.token = action.user.token;
  draft.user.username = action.user.username;
  draft.user.authorities = action.user.authorities;
  localStorage.setItem('@TechEcommerce:user', JSON.stringify(draft));
});

const logoutUser = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  console.log('action', action);
  if (draft.user) {
    draft.user = {} as any;
  }
  localStorage.removeItem('@TechEcommerce:user');
});

const getUserLocalStorageCredentials = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const userStorage = localStorage.getItem('@TechEcommerce:user');
  if (userStorage) {
    const parsedUser = JSON.parse(userStorage);
    draft.user = parsedUser;
  }
});

export const HANDLERS = {
  [Types.GET_USER_LOGIN_SUCCESS]: getLoginSuccess,
  [Types.LOGOUT_USER]: logoutUser,
  [Types.GET_USER_LOCAL_STORAGE_CREDENTIALS]: getUserLocalStorageCredentials,
};
