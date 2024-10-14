/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import produce from 'immer';
import { VariantType } from 'notistack';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';
import { v4 as uuidv4 } from 'uuid';

export interface ISnackbar {
  key?: string;
  message: string;
  variant: VariantType | undefined;
  dismissed?: boolean;
}
export const INITIAL_STATE = {
  snackbars: [] as ISnackbar[],
};
export default createTypes(`
  GET_SNACKBAR_BY_KEY
  ENQUEUE_SNACKBAR
  CLOSE_SNACKBAR
  UPDATE_SNACKBAR
`);

export const { Types, Creators } = createActions({
  enqueueSnackbar: ['snackbar'],
  closeSnackbar: ['key'],
  getSnackbarByKey: ['key'],
  updateSnackbar: ['snackbar'],
});

const getSnackbarByKey = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  draft.snackbars.find((snackbar: ISnackbar) => snackbar.key === action.key);
});

const enqueueSnackbar = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  draft.snackbars.push(
    {
      key: uuidv4(),
      message: action.snackbar.message,
      variant: action.snackbar.variant,
    },
  );
});

const closeSnackbar = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // const snackbarIndex = draft.snackbars.findIndex(snackbar => snackbar.key === action.key);
  // draft.snackbars[snackbarIndex].dismissed = true;
  draft.snackbars.splice(action.key, 1);
});

const updateSnackbar = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const index = draft.snackbars.findIndex(snackbar => snackbar.key === action.snackbar.key);
  if (index !== -1) {
    draft.snackbars[index].message = action.snackbar.message;
  } else {
    draft.snackbars.push(
      {
        key: action.snackbar.key,
        message: action.snackbar.message,
        variant: action.snackbar.variant,
      },
    );
  }
});

export const HANDLERS = {
  [Types.GET_SNACKBAR_BY_KEY]: getSnackbarByKey,
  [Types.ENQUEUE_SNACKBAR]: enqueueSnackbar,
  [Types.CLOSE_SNACKBAR]: closeSnackbar,
  [Types.UPDATE_SNACKBAR]: updateSnackbar,
};
