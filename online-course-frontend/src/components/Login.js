import React, { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.password);
      navigate("/admin");
    } catch (err) {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2"
          placeholder="Email"
          type="email"
          onChange={(e) => setInput({ ...input, email: e.target.value })} />

        <input className="form-control my-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setInput({ ...input, password: e.target.value })} />

        <button className="btn btn-primary w-100">Login</button>
      </form>
      {msg && <p className="text-danger mt-2">{msg}</p>}
    </div>
  );
}
