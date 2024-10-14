import { api } from '../api';
import { IRegisterUserData } from './types';

export const getAuthAxiosRequest = async (email: string, password: string) => api.post('/auth', {
  email,
  password,
});

export const registerUserAxiosRequest = async (data: IRegisterUserData) => api.post('/users', {
  username: data.username,
  email: data.email,
  password: data.password,
});
