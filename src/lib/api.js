// src/lib/api.js
import axios from "axios";

const BASE_URL =
  (import.meta?.env?.VITE_API_BASE_URL) || // Vite
  process.env.REACT_APP_BASE_URL ||        // CRA
  "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  withCredentials: false, // keep false when using Bearer tokens (avoids credentialed CORS)
});

// Attach Bearer token automatically
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("access_token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Default content-type for non-FormData requests
  const isForm = config.data instanceof FormData;
  if (!isForm && !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const payload = {
      status: error?.response?.status,
      message: error?.response?.data?.message || error?.message || "Network error",
      data: error?.response?.data?.data,
    };
    return Promise.reject(payload);
  }
);

export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080/api",
//   timeout: 20000,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const payload = error?.response?.data || { message: error.message || "Network error" };
//     return Promise.reject(payload);
//   }
// );

// export default api;
