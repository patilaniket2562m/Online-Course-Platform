import axios from "axios";

const BASE_URL = "https://online-course-platform-mm2u.onrender.com";

const api = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: false,   // 🔥 Disable creds for JWT only
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
