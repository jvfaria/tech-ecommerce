import { api } from '../api';

export const uploadAvatarAxiosRequest = (file: File) => api.post('/user-info/avatar/upload', file, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getAvatarAxiosRequest = (fileName: string) => api.get(`/downloadFile/${fileName}`, {
  headers: {
    'Content-Type': 'application/octet-stream',
  },
});

export const getUserAvatarByUsernameAxiosRequest = (username: string) => api.get(`/avatar/${username}`);
