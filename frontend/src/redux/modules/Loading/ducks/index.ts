import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  isLoading: false,
};

export default createTypes(`
  LOADING_REQUEST,
  LOADING_SUCCESS,
`);

export const { Types, Creators } = createActions({
  loadingRequest: [],
  loadingSuccess: [],
});

const loadingRequest = (
  state = INITIAL_STATE,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.isLoading = true;
});

const loadingSuccess = (
  state = INITIAL_STATE,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.isLoading = false;
});

export const HANDLERS = {
  [Types.LOADING_REQUEST]: loadingRequest,
  [Types.LOADING_SUCCESS]: loadingSuccess,
};
