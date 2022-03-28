import { combineReducers } from 'redux';
import { createReducer } from 'reduxsauce';
import { INITIAL_STATE as catalogInitialState, HANDLERS as CATALOG_HANDLERS } from './Catalog/ducks/index';
import { INITIAL_STATE as cartInitialState, HANDLERS as CART_HANDLERS } from './Cart/ducks/index';

export default combineReducers({
  cart: createReducer(cartInitialState, CART_HANDLERS),
  catalog: createReducer(catalogInitialState, CATALOG_HANDLERS),
});
