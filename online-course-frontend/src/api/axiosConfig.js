import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",  // IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT Auto Attach (EXCEPT /auth login/register)
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
