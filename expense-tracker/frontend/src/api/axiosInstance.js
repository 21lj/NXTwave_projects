import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 10000,
  // withCredentials: true, // uncomment if you later switch to HTTP-only cookies
});

// attach token from localStorage automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// optional response interceptor to normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can inspect error.response.status here for global behavior (e.g., 401)
    // For now we just propagate it so hooks/components handle it.
    return Promise.reject(error);
  }
);

export default api;
