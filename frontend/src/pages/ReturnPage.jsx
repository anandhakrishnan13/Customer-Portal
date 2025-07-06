import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ReturnPage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const [trackingId, setTrackingId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate reverse pickup API by generating dummy tracking ID
    const mockTrackingId = 'RTN-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingId(mockTrackingId);

    setTimeout(() => {
      alert(
        `Return requested for Order ID: ${orderId}\nReason: ${reason}\nReverse Pickup Tracking ID: ${mockTrackingId}`
      );
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mb-4">Request Return – Order ID: {orderId}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Reason for Return</label>
            <textarea
              className="form-control"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
            <button type="submit" className="btn btn-success">
              Confirm Return
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReturnPage;
