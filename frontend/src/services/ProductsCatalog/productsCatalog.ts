import { api } from '../api';

export const getProductsCatalogAxiosRequest = () => api.get('/products');

export const getFeaturedProductsCatalogAxiosRequest = () => api.get('/products/featured');

export const getProductsByCategoryAxiosRequest = (categoryName: string) => api.get(`/products/category/${categoryName}`);

export const getProductsByBrandAxiosRequest = (brandName: string) => api.get(`/products/brand/${brandName}`);

export const getProductByIdAxiosRequest = (productId: string) => api.get(`/products/${productId}`);

export const countAll = async () => api.get('/products/total');
