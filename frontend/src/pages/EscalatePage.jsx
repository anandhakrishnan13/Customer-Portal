import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EscalatePage = () => {
  const { orderId } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Issue escalated for Order ID: ${orderId}\nMessage: ${message}`);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mb-4">Escalate Issue – Order ID: {orderId}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Describe your issue</label>
            <textarea
              className="form-control"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-warning">
              Submit Escalation
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EscalatePage;
