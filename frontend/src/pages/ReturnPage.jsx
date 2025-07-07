import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import mockOrders from '../data/mockOrders';

const ReturnPage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = reason === 'other' ? otherReason : reason;

    // Find order and get product name
    const order = mockOrders.find((o) => o.orderId === orderId);
    const productName = order ? order.productName : 'Unknown Product';

    // Generate dummy tracking ID
    const trackingId = 'RTN-' + Math.floor(100000 + Math.random() * 900000);

    // Simulate pickup date (+2 days)
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 2);
    const formattedDate = pickupDate.toDateString();

    // Navigate to summary
    navigate('/return-summary', {
      state: {
        orderId,
        productName,
        trackingId,
        reason: finalReason,
        pickupDate: formattedDate,
      },
    });
  };

  const reasons = [
    'Received a damaged product.',
    'Received a defective or non-working product.',
    'Wrong product delivered.',
    'Product quality is not as expected.',
    'Product differs from the description.',
    'Received a different size/color/model.',
    'Product seal was broken.',
    'Incomplete product/package received.',
    'Used or previously opened item delivered.',
    'No longer needed.',
    'Changed my mind.',
    'Ordered by mistake.',
    'Found a better alternative elsewhere.',
    'other',
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mb-4">Request Return – Order ID: {orderId}</h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Select Reason for Return</label>
            {reasons.map((r, idx) => (
              <div className="form-check" key={idx}>
                <input
                  type="radio"
                  className="form-check-input"
                  id={`reason-${idx}`}
                  name="returnReason"
                  value={r}
                  checked={reason === r}
                  onChange={(e) => setReason(e.target.value)}
                />
                <label className="form-check-label" htmlFor={`reason-${idx}`}>
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
