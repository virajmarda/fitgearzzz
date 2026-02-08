// frontend/src/utils/api.js
import axios from 'axios';

// IMPORTANT: use same-origin /api so the frontend talks to the backend
// through your reverse proxy (e.g. Vercel rewrites), avoiding CORS.
const api = axios.create({
  baseURL: '/api',
});

// Attach token if you still need it for your own auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
