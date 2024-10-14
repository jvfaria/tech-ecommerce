import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';

export const INITIAL_STATE = {
  brands: [],
};

export default createTypes(`
  GET_BRANDS_REQUEST
  GET_BRANDS_SUCCESS
  GET_BRANDS_FAIL
`);

export const { Types, Creators } = createActions({
  getBrandsRequest: [],
  getBrandsSuccess: ['brands'],
  getBrandsFail: ['errors'],
});

const getBrandsSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.brands.length === 0) {
    draft.brands.push(...action.brands as never[]);
  }
});

export const HANDLERS = {
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
};
