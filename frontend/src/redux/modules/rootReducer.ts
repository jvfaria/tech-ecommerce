import { combineReducers } from 'redux';
import { createReducer } from 'reduxsauce';
import { INITIAL_STATE as catalogInitialState, HANDLERS as CATALOG_HANDLERS } from './Catalog/ducks/index';
import { INITIAL_STATE as cartInitialState, HANDLERS as CART_HANDLERS } from './Cart/ducks/index';
import { INITIAL_STATE as brandsInitialState, HANDLERS as BRAND_HANDLERS } from './Brands/ducks/index';
import { INITIAL_STATE as categoriesInitialState, HANDLERS as CATEGORY_HANDLERS } from './Categories/ducks/index';
import { INITIAL_STATE as authInitialState, HANDLERS as AUTH_HANDLERS } from './Auth/ducks/index';
import { INITIAL_STATE as snackbarInitialState, HANDLERS as SNACKBAR_HANDLERS } from './Snackbar/ducks/index';

export default combineReducers({
  cart: createReducer(cartInitialState, CART_HANDLERS),
  catalog: createReducer(catalogInitialState, CATALOG_HANDLERS),
  brands: createReducer(brandsInitialState, BRAND_HANDLERS),
  categories: createReducer(categoriesInitialState, CATEGORY_HANDLERS),
  auth: createReducer(authInitialState, AUTH_HANDLERS),
  snackbars: createReducer(snackbarInitialState, SNACKBAR_HANDLERS),
});
