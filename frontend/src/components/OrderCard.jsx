import React from "react";
import { useNavigate } from "react-router-dom";

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

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // ✅ dd/mm/yyyy
  };

  const handleEscalateClick = () => {
    navigate(`/escalate/${orderId}`);
  };

  const handleCancelClick = () => {
    navigate(`/cancel/${orderId}`);
  };

  const handleReturnClick = () => {
    navigate(`/return/${orderId}`);
  };

  const isDelivered = status === "Delivered";
  const isCancelled = status === "Cancelled";
  const isReturned = status === "Returned";

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Order ID: {orderId}</h6>

        <p className="mb-1"><strong>Status:</strong> {status}</p>
        <p className="mb-1"><strong>Price:</strong> ₹{price}</p>
        <p className="mb-1">
          <strong>Ordered On:</strong> {formatDate(dateOfOrder)}
        </p>

        {isReturned ? (
          <>
            <p className="mb-1">
              <strong>Delivered On:</strong>{" "}
              {formatDate(deliveredOn)}
            </p>
            <p className="mb-3">
              <strong>Return Pickup Date:</strong>{" "}
              {returnPickupDate ? formatDate(returnPickupDate) : "Not scheduled"}
            </p>
          </>
        ) : isDelivered ? (
          <p className="mb-3">
            <strong>Delivered On:</strong>{" "}
            {deliveredOn ? formatDate(deliveredOn) : formatDate(expectedDelivery)}
          </p>
        ) : expectedDelivery ? (
          <p className="mb-3">
            <strong>Expected Delivery:</strong> {formatDate(expectedDelivery)}
          </p>
        ) : null}

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
