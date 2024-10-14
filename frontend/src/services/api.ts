import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8082/v1/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
