import produce from 'immer';
import { AnyAction } from 'redux';
import { createActions, createTypes } from 'reduxsauce';
import { IProduct } from '../../Cart/types';

export const INITIAL_STATE = {
  products: [] as IProduct[],
  featuredProducts: [],
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
    draft.products.push(...action.products as never[]);
  }
});

const getFeaturedProductsCatalogSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  if (state.featuredProducts.length === 0) {
    draft.featuredProducts.push(...action.featuredProducts as never[]);
  }
});

const getProductsByCategorySuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  // const toRemove = draft.products.filter(
  //   item => !action.products.find((i: any) => item.id === i.id),
  // );
  // const a = draft.products.splice(0, toRemove.length, ...toRemove);
  // const b = draft.products.filter(item => a.find((i:any) => i.id !== item.id));
  // // eslint-disable-next-line no-param-reassign
  // draft.products = b;
  const ids = draft.products.map((product: IProduct) => product.id);
  const a = action.products.filter(
    (item: IProduct) => ids.includes(item.id),
  );
  if (a.length === 0) {
    draft.products.push(...action.products);
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.products = a;
  }

  // console.log('to remove', toRemove);
  // if (toRemove.length === 0) {
  //   draft.products.push(...action.products);
  // }
});

const getProductsByBrandSuccess = (
  state = INITIAL_STATE, action: AnyAction,
) => produce(state, (draft) => {
  console.log(action.products);
  // const toRemove = draft.products.filter(
  //   item => !action.products.find((i: any) => item.id === i.id),
  // );
  // const a = draft.products.splice(0, toRemove.length, ...toRemove);
  // const b = draft.products.filter(item => a.find((i:any) => i.id !== item.id));
  // // eslint-disable-next-line no-param-reassign
  // draft.products = b;
  const ids = draft.products.map((product: IProduct) => product.id);
  console.log(ids);
  const a = action.products.filter(
    (item: IProduct) => ids.includes(item.id),
  );

  console.log('a', a);

  if (a.length === 0) {
    console.log('alength: 0');
    draft.products.push(...action.products);
  } else {
    // eslint-disable-next-line no-param-reassign
    draft.products = a;
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
  console.log('draftaction', action);
  // eslint-disable-next-line no-param-reassign
  draft.selectedProduct.product = { ...action.product };

  // eslint-disable-next-line no-param-reassign
  draft.selectedProduct.isLoading = false;
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

};
