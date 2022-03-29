import { api } from '../api';

export const getCategoriesAxiosRequest = () => api.get('/categories');
