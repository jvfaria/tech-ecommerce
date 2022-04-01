import { api } from '../api';

export const getProductsCatalogAxiosRequest = () => api.get('/products');

export const getFeaturedProductsCatalogAxiosRequest = () => api.get('/products/featured');
