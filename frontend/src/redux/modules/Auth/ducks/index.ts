import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  token: '',
};

export default createTypes(`
  GET_USER_LOGIN_REQUEST
  GET_USER_LOGIN_SUCCESS
  GET_USER_LOGIN_FAIL
`);

export const { Types, Creators } = createActions({
  getUserLoginRequest: ['email', 'password'],
  getUserLoginSuccess: ['token'],
  getUserLoginFail: ['error'],
});

const getLoginSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.token = action.token;
});

export const HANDLERS = {
  [Types.GET_USER_LOGIN_SUCCESS]: getLoginSuccess,
};
