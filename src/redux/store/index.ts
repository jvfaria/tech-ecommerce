import { createStore } from 'redux';
import { ICartState } from '../modules/Cart/types';
import rootReducer from '../modules/rootReducer';

export interface IState {
  cart: ICartState;
}
export const store = createStore(rootReducer);
