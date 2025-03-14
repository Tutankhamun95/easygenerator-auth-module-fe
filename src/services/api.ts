import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
  return authToken || localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  authToken = null;
  localStorage.removeItem('authToken');
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
  const response = await api.post('/main/refresh', { refreshToken });
  setAuthToken(response.data.accessToken);
  return response.data;
};

// Handle Protected Route
export const getProtectedData = async () => {
  try {
    const response = await api.get('/main/hello', {
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

// Handle Logout
export const logout = () => {
  console.log(getAuthToken());
  localStorage.removeItem('authToken'); // Remove token from storage
  console.log(getAuthToken());
  return api.post('/auth/logout', null, {});
};
