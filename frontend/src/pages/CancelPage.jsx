import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CancelPage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cancellation requested for Order ID: ${orderId}\nReason: ${reason}`);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mb-4">Request Cancellation – Order ID: {orderId}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Optional: Reason for Cancellation</label>
            <textarea
              className="form-control"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
            <button type="submit" className="btn btn-danger">
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CancelPage;
