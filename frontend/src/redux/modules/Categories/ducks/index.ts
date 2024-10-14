import produce from 'immer';
import { AnyAction } from 'redux';
import { createTypes, createActions } from 'reduxsauce';

export const INITIAL_STATE = {
  categories: [],
};

export default createTypes(`
  GET_CATEGORIES_REQUEST
  GET_CATEGORIES_SUCCESS
  GET_CATEGORIES_FAIL
`);

export const { Types, Creators } = createActions({
  getCategoriesRequest: [],
  getCategoriesSuccess: ['categories'],
  getCategoriesFail: ['errors'],
});

const getCategoriesSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.categories.length === 0) {
    draft.categories.push(...action.categories as never[]);
  }
});

export const HANDLERS = {
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
};
