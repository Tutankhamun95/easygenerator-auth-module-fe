import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

// Store tokens
const setAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getAuthToken = () => localStorage.getItem('accessToken');

// Remove tokens
const removeAuthToken = () => {
  localStorage.removeItem('accessToken');
  delete api.defaults.headers.common['Authorization'];
};

// Handle Sign-up
export const signUp = async (signupData: { email: string; password: string }) => {
  return api.post('/auth/signup', signupData);
};

// Handle Login
export const login = async (loginData: { email: string; password: string }) => {
  const response = await api.post('/auth/login', loginData);
  setAuthToken(response.data.accessToken);
  return response.data;
};

// Handle Refresh Token
export const refreshToken = async (refreshToken: string) => {
  const response = await api.post('/auth/refresh', { refreshToken });
  setAuthToken(response.data.accessToken);
  return response.data;
};

// Handle Protected Route
export const getProtectedData = async () => {
  try {
    const response = await api.get('/auth/omak', {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      removeAuthToken();
    }
    throw error;
  }
};
