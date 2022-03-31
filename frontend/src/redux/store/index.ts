import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { IAuthState } from '../modules/Auth/types';
import { IBrandState } from '../modules/Brands/types';
import { ICartState } from '../modules/Cart/types';
import { ICatalogState } from '../modules/Catalog/types/types';
import { ICategoryState } from '../modules/Categories/types';
import rootReducer from '../modules/rootReducer';
import rootSaga from '../modules/rootSaga';
import { ISnackbar } from '../modules/Snackbar/ducks';
import { ISnackbarState } from '../modules/Snackbar/types';

export interface IState {
  cart: ICartState;
  catalog: ICatalogState;
  brands: IBrandState;
  categories: ICategoryState;
  auth: IAuthState;
  snackbars: ISnackbarState;
}

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddlewares.run(rootSaga);
