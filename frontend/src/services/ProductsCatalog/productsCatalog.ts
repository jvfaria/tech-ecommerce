import { api } from '../api';

export const getProductsCatalog = () => api.get('/products');
