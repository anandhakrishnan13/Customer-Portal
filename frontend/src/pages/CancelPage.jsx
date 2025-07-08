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

    navigate('/cancel-summary', {
      state: {
        orderId,
        reason: finalReason,
        cancellationDate: new Date().toISOString(),
      },
    });
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
    'other',
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-4 text-center">Request Cancellation – Order ID: {orderId}</h3>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-semibold">Reason for Cancellation</label>
                <div className="d-flex flex-column gap-2">
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
                        required
                      />
                      <label className="form-check-label" htmlFor={`cancel-option-${idx}`}>
                        {r === 'other' ? 'Other (please specify below)' : r}
                      </label>
                    </div>
                  ))}
                </div>

                {reason === 'other' && (
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Please specify your reason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="d-flex gap-3">
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
        </div>
      </div>
    </>
  );
};

export default CancelPage;
