import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order, onEscalate, onCancel, onReturn }) => {
  const {
    productName,
    status,
    price,
    dateOfOrder,
    expectedDelivery,
    orderId,
  } = order;
const navigate = useNavigate();

  const handleEscalateClick = () => {
    navigate(`/escalate/${orderId}`);
  };
  const handleCancelClick = () =>{
    navigate(`/cancel/${orderId}`);
  }
  const handleReturnClick = () =>{
    navigate(`/return/${orderId}`);
  }

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
          <button className="btn btn-outline-warning btn-sm" onClick={handleEscalateClick}>
            Escalate Issue
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleCancelClick}>
            Request Cancellation
          </button>
          <button className="btn btn-outline-success btn-sm" onClick={handleReturnClick}>
            Request Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
