import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: 'https:127.0.0.1:5000',
  });

export default api

