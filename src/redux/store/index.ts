import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ICartState } from '../modules/Cart/types';
import rootReducer from '../modules/rootReducer';
import rootSaga from '../modules/rootSaga';
import { ICatalogState } from '../modules/Catalog/types';

export interface IState {
  cart: ICartState;
  catalog: ICatalogState;
}

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddlewares.run(rootSaga);
