import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithPassword, loginWithOrderId } from "../services/api";
import Navbar from "../components/Navbar";
import './LoginPage.css';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [orderId, setOrderId] = useState("");
  const [useOrderId, setUseOrderId] = useState(false); 
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let token, user;

      if (useOrderId) {
        const response = await loginWithOrderId(identifier, orderId);
        token = response.token;
        user = response.user;
      } else {
        const response = await loginWithPassword(identifier, password);
        token = response.token;
        user = response.user;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h3 className="mb-4">Customer Login</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="text"
              className="form-control"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {!useOrderId ? (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Order ID</label>
              <input
                type="text"
                className="form-control"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="form-check form-switch mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="toggleLoginMode"
              checked={useOrderId}
              onChange={() => setUseOrderId(!useOrderId)}
            />
            <label className="form-check-label" htmlFor="toggleLoginMode">
              {useOrderId
                ? "Switch to Password Login"
                : "Switch to Order ID Login"}
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
