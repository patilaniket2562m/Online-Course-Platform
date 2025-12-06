import api from "./axiosConfig";

export async function login(email, password) {
  const res = await api.post(
    "/auth/login",
    { email, password },
    { withCredentials: true } // 🔥 IMPORTANT
  );

  if (res?.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: res.data.email,
        role: res.data.role,
      })
    );
  }

  return res.data;
}

export async function registerUser(name, email, password) {
  // Clear existing session
  localStorage.removeItem("token");

  const res = await api.post(
    "/auth/register",
    { name, email, password },
    { withCredentials: true } // 🔥 IMPORTANT
  );

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
