import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [passwordOrOrderId, setPasswordOrOrderId] = useState('');
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'orderId'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: Send data to backend
    console.log('Login Submitted:', { emailOrPhone, passwordOrOrderId, loginMethod });

    // Simulate successful login
    navigate('/dashboard');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Customer Login</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="text"
              className="form-control"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {loginMethod === 'password' ? 'Password' : 'Order ID'}
            </label>
            <input
              type={loginMethod === 'password' ? 'password' : 'text'}
              className="form-control"
              value={passwordOrOrderId}
              onChange={(e) => setPasswordOrOrderId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="toggleLogin"
              onChange={() =>
                setLoginMethod(loginMethod === 'password' ? 'orderId' : 'password')
              }
            />
            <label className="form-check-label" htmlFor="toggleLogin">
              Use {loginMethod === 'password' ? 'Order ID' : 'Password'} instead
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
