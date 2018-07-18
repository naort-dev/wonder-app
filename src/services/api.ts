import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.getwonderapp.com',
  // timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
export default api;