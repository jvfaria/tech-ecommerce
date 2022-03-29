import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { IBrandState } from '../modules/Brands/types';
import { ICartState } from '../modules/Cart/types';
import { ICatalogState } from '../modules/Catalog/types/types';
import { ICategoryState } from '../modules/Categories/types';
import rootReducer from '../modules/rootReducer';
import rootSaga from '../modules/rootSaga';

export interface IState {
  cart: ICartState;
  catalog: ICatalogState;
  brands: IBrandState;
  categories: ICategoryState;
}

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddlewares.run(rootSaga);
