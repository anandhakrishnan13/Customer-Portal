import React from 'react';

const OrderCard = ({ order, onEscalate, onCancel, onReturn }) => {
  const {
    productName,
    status,
    price,
    dateOfOrder,
    expectedDelivery,
    orderId,
  } = order;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Order ID: {orderId}</h6>
        
        <p className="mb-1"><strong>Status:</strong> {status}</p>
        <p className="mb-1"><strong>Price:</strong> ₹{price}</p>
        <p className="mb-1"><strong>Ordered On:</strong> {new Date(dateOfOrder).toLocaleDateString()}</p>
        {expectedDelivery && (
          <p className="mb-3"><strong>Expected Delivery:</strong> {new Date(expectedDelivery).toLocaleDateString()}</p>
        )}

        <div className="d-flex gap-2">
          <button className="btn btn-outline-warning btn-sm" onClick={() => onEscalate(orderId)}>
            Escalate Issue
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => onCancel(orderId)}>
            Request Cancellation
          </button>
          <button className="btn btn-outline-success btn-sm" onClick={() => onReturn(orderId)}>
            Request Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
