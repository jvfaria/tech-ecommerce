import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';
import { IProduct } from '../../Cart/types';

export const INITIAL_STATE = {
  products: [] as IProduct[],
  featuredProducts: [] as IProduct[],
  filteredProducts: [] as IProduct[],
  selectedProduct: {
    product: {} as IProduct,
    isLoading: false,
  },
};

export default createTypes(`
  GET_PRODUCTS_CATALOG_REQUEST
  GET_PRODUCTS_CATALOG_SUCCESS
  GET_PRODUCTS_CATALOG_FAIL

  GET_FEATURED_PRODUCTS_CATALOG_REQUEST
  GET_FEATURED_PRODUCTS_CATALOG_SUCCESS
  GET_FEATURED_PRODUCTS_CATALOG_FAIL

  GET_PRODUCTS_BY_CATEGORY_REQUEST
  GET_PRODUCTS_BY_CATEGORY_SUCCESS
  GET_PRODUCTS_BY_CATEGORY_FAIL

  GET_PRODUCTS_BY_FILTERS_REQUEST
  GET_PRODUCTS_BY_FILTERS_SUCCESS
  GET_PRODUCTS_BY_FILTERS_FAIL

  GET_PRODUCTS_BY_BRAND_REQUEST
  GET_PRODUCTS_BY_BRAND_SUCCESS
  GET_PRODUCTS_BY_BRAND_FAIL

  UNCHECK_PRODUCTS_BY_CATEGORY

  UNCHECK_PRODUCTS_BY_BRAND

  GET_PRODUCT_BY_ID_REQUEST
  GET_PRODUCT_BY_ID_SUCCESS
  GET_PRODUCT_BY_ID_FAIL
`);

export const { Types, Creators } = createActions({
  getProductsCatalogRequest: [],
  getProductsCatalogSuccess: ['products'],
  getProductsCatalogFail: [],

  getProductByIdRequest: ['product'],
  getProductByIdSuccess: ['product'],
  getProductByIdError: [],

  getProductsByFiltersRequest: ['filters'],
  getProductsByFiltersSuccess: ['products'],
  getProductsByFiltersFail: [],

  getFeaturedProductsCatalogRequest: [],
  getFeaturedProductsCatalogSuccess: ['featuredProducts'],
  getFeaturedProductsCatalogFail: [],

  getProductsByCategoryRequest: ['category'],
  getProductsByCategorySuccess: ['products'],
  getProductsByCategoryFail: [],

  getProductsByBrandRequest: ['brand'],
  getProductsByBrandSuccess: ['products'],
  getProductsByBrandFail: [],

  uncheckProductsByCategory: ['category'],

  uncheckProductsByBrand: ['brand'],

});

const getProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.products.length === 0) {
    draft.products.push(...action.products);
  }
});

const getFeaturedProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.featuredProducts.length === 0) {
    draft.featuredProducts.push(...action.featuredProducts);
  }
});

const getProductsByCategorySuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const ids = draft.products.map((product: IProduct) => product.id);
  const newArray = action.products.filter(
    (item: IProduct) => ids.includes(item.id),
  );
  if (newArray.length === 0) {
    draft.products.push(...action.products);
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.products = newArray;
  }
});

const getProductsByBrandSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const ids = draft.products.map((product: IProduct) => product.id);
  const newArray = action.products.filter(
    (item: IProduct) => ids.includes(item.id),
  );
  if (newArray.length === 0) {
    draft.products.push(...action.products);
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.products = newArray;
  }
});

const uncheckProductsByCategory = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const newArray = draft.products.filter(
    item => item.category.name.toUpperCase() !== action.category.toUpperCase(),
  );
  // eslint-disable-next-line no-param-reassign
  draft.products = newArray;
});

const uncheckProductsByBrand = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  const newArray = draft.products.filter(
    item => item.brand.name.toUpperCase() !== action.brand.toUpperCase(),
  );
  // eslint-disable-next-line no-param-reassign
  draft.products = newArray;
});

const getProductByIdSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // eslint-disable-next-line no-param-reassign
  draft.selectedProduct.product = { ...action.product };

  // eslint-disable-next-line no-param-reassign
  draft.selectedProduct.isLoading = false;
});

const getProductsByFiltersSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.products.length === 0) {
    draft.products.push(...action.products);
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.products = action.products;
  }
});

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_PRODUCTS_CATALOG_SUCCESS]: getProductsCatalogSuccess,

  [Types.GET_FEATURED_PRODUCTS_CATALOG_SUCCESS]: getFeaturedProductsCatalogSuccess,

  [Types.GET_PRODUCTS_BY_CATEGORY_SUCCESS]: getProductsByCategorySuccess,

  [Types.GET_PRODUCTS_BY_BRAND_SUCCESS]: getProductsByBrandSuccess,

  [Types.UNCHECK_PRODUCTS_BY_CATEGORY]: uncheckProductsByCategory,

  [Types.UNCHECK_PRODUCTS_BY_BRAND]: uncheckProductsByBrand,

  [Types.GET_PRODUCT_BY_ID_SUCCESS]: getProductByIdSuccess,

  [Types.GET_PRODUCTS_BY_FILTERS_SUCCESS]: getProductsByFiltersSuccess,

};
