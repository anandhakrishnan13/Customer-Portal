import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const {
    productName,
    status,
    price,
    dateOfOrder,
    expectedDelivery,
    orderId,
    deliveredOn,
    returnPickupDate,
  } = order;

  const navigate = useNavigate();

  const handleEscalateClick = () => {
    navigate(`/escalate/${orderId}`);
  };

  const handleCancelClick = () => {
    navigate(`/cancel/${orderId}`);
  };

  const handleReturnClick = () => {
    navigate(`/return/${orderId}`);
  };

  const isDelivered = status === 'Delivered';
  const isCancelled = status === 'Cancelled';
  const isReturned = status === 'Returned';

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Order ID: {orderId}</h6>

        <p className="mb-1"><strong>Status:</strong> {status}</p>
        <p className="mb-1"><strong>Price:</strong> ₹{price}</p>
        <p className="mb-1"><strong>Ordered On:</strong> {new Date(dateOfOrder).toLocaleDateString()}</p>

        {isDelivered || isReturned ? (
          <p className="mb-1">
            <strong>Delivered On:</strong>{' '}
            {new Date(deliveredOn || expectedDelivery).toLocaleDateString()}
          </p>
        ) : expectedDelivery && (
          <p className="mb-1">
            <strong>Expected Delivery:</strong>{' '}
            {new Date(expectedDelivery).toLocaleDateString()}
          </p>
        )}

        {isReturned && returnPickupDate && (
          <p className="mb-3">
            <strong>Return Pickup Date:</strong>{' '}
            {new Date(returnPickupDate).toLocaleDateString()}
          </p>
        )}

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleEscalateClick}
          >
            Escalate Issue
          </button>

          {!isDelivered && !isReturned && !isCancelled && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancelClick}
            >
              Request Cancellation
            </button>
          )}

          {isDelivered && (
            <button
              className="btn btn-outline-success btn-sm"
              onClick={handleReturnClick}
            >
              Request Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
