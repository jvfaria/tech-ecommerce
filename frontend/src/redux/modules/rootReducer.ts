import { combineReducers } from 'redux';
import { cartReducer } from './Cart/reducer';
import { catalogReducer } from './Catalog/reducer';

export default combineReducers({
  cart: cartReducer,
  catalog: catalogReducer,
});
