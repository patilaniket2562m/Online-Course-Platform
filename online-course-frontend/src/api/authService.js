import axios from "./axiosConfig";

export async function login(email, password) {
  const res = await axios.post("/auth/login", { email, password });
  // res.data should be { token, email, role } as AuthResponse
  if (res && res.data && res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ email: res.data.email, role: res.data.role }));
  }
  return res.data;
}

export async function registerUser(name, email, password) {
  // ensure token is not present when registering
  localStorage.removeItem("token");
  const res = await axios.post("/auth/register", { name, email, password });
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}
