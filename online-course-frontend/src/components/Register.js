import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // clear any stale token before registering
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form.name, form.email, form.password);
      alert("Registered! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + (err?.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <input name="name" placeholder="Name" className="form-control mb-2" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" className="form-control mb-2" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control mb-2" value={form.password} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}
