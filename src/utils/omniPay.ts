import axios, {AxiosError} from 'axios';
import {API_BASE_URL} from '../../env.json';

const omniPayApi = axios.create({
  baseURL: `${API_BASE_URL}/test`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default omniPayApi;
