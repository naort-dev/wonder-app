import axios, { AxiosRequestConfig } from 'axios';
import { UserState } from '../store/reducers/user';

const wonderApi = axios.create({
  baseURL: 'https://api.getwonderapp.com/v1',
  // timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const api = (opts: AxiosRequestConfig, userState?: UserState) => {
  if (userState && userState.token) {
    opts.headers = {
      ...opts.headers,
      'Authorization': userState.token
    }
  }

  return wonderApi(opts)
}

export default api;