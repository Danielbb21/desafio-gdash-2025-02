import axios from 'axios';
const URL = 'http://localhost:3000/'
const authenticathedInterceptor = axios.create({ baseURL: URL });
const baseAxios = axios.create({ baseURL: URL });

authenticathedInterceptor.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
      throw new Error('Unauthorized')
    }
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { authenticathedInterceptor, baseAxios };
