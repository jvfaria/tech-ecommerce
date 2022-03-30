import { api } from '../api';

export const getAuthAxiosRequest = (email: string, password: string) => api.post('/auth', {
  email,
  password,
});
