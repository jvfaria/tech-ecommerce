import { combineReducers } from 'redux';
import { createReducer } from 'reduxsauce';
import { cartReducer } from './Cart/reducer';
import { INITIAL_STATE as catalogInitialState, HANDLERS } from './Catalog/ducks/index';

export default combineReducers({
  cart: cartReducer,
  catalog: createReducer(catalogInitialState, HANDLERS),
});
