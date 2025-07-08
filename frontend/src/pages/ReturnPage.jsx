import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchOrderById } from '../services/api';

const ReturnPage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const order = await fetchOrderById(orderId);
        setProductName(order.productName);
      } catch (err) {
        setError('Failed to load order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = reason === 'other' ? otherReason : reason;
    const trackingId = 'RTN-' + Math.floor(100000 + Math.random() * 900000);
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 2);

    navigate('/return-summary', {
      state: {
        orderId,
        productName,
        trackingId,
        reason: finalReason,
        pickupDate,
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-danger text-center">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-4 text-center">Request Return – Order ID: {orderId}</h3>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Reason for Return</label>
                <div className="d-flex flex-column gap-2">
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
                        required
                      />
                      <label className="form-check-label" htmlFor={`reason-${idx}`}>
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
                <button type="submit" className="btn btn-success">
                  Confirm Return
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPage;
