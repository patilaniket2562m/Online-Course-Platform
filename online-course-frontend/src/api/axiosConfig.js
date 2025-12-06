import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://online-course-platform-mm2u.onrender.com";

const api = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.url && config.url.startsWith("/auth")) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
