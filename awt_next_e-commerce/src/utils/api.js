import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_ENDPOINT, // Assuming you have API_ENDPOINT defined in your environment variables
  timeout: 5000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authForEcomerce');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;