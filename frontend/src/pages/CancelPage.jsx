import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CancelPage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = reason === 'other' ? otherReason : reason;
    alert(`Cancellation requested for Order ID: ${orderId}\nReason: ${finalReason}`);
    navigate('/dashboard');
  };

  const cancelReasons = [
    'Ordered by mistake',
    'Found a better price elsewhere',
    'No longer needed',
    'Ordered wrong item (size, color, model)',
    'Expected delivery date is too late',
    'Changed my mind',
    'Placing a new order with updated details',
    'Accidental duplicate order',
    'other'
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mb-4">Request Cancellation – Order ID: {orderId}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Reason for Cancellation</label>
            {cancelReasons.map((r, idx) => (
              <div key={idx} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id={`cancel-option-${idx}`}
                  value={r}
                  onChange={() => setReason(r)}
                  checked={reason === r}
                />
                <label className="form-check-label" htmlFor={`cancel-option-${idx}`}>
                  {r === 'other' ? 'Other (please specify below)' : r}
                </label>
              </div>
            ))}

            {reason === 'other' && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Please specify your reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                required
              />
            )}
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
