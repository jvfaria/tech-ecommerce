import { api } from '../api';

export const getAuthAxiosRequest = async (email: string, password: string) => api.post('/auth', {
  email,
  password,
});
