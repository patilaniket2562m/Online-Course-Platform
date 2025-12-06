import axios from "axios";

const api = axios.create({
  baseURL:
    (process.env.REACT_APP_API_URL ||
      "https://devoted-heart-production.up.railway.app") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 REQUIRED
});

// JWT Auto Attach
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
