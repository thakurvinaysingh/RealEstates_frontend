import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080/api",
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const payload = error?.response?.data || { message: error.message || "Network error" };
    return Promise.reject(payload);
  }
);

export default api;
