import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUndo,
  FaExclamationTriangle,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";

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
    returnRequest,
    escalation,
    cancellationRequest,
  } = order;

  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const normalizedStatus = status?.trim()?.toLowerCase?.();
  const isDelivered = normalizedStatus === "delivered";
  const isReturned = normalizedStatus === "returned";
  const isCancelled = normalizedStatus === "cancelled";

  const getStatusClass = () => {
    switch (normalizedStatus) {
      case "delivered":
        return "bg-success text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "returned":
        return "bg-warning text-dark";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <div
      className="card mb-4 shadow-sm border-0 position-relative mx-auto"
      style={{ maxWidth: "700px" }} // limit max width
    >
      <div className="card-body px-4 py-3">
        {/* 🔖 Status Badge */}
        <div
          className={`position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill fw-semibold small ${getStatusClass()}`}
          style={{ zIndex: 1 }}
        >
          {status}
        </div>

        <h5 className="mb-2">{productName}</h5>
        <p className="mb-1">
          <strong>Order ID:</strong> {orderId}
        </p>
        <p className="mb-1">
          <strong>Price:</strong> ₹{price}
        </p>
        <p className="mb-1">
          <strong>Ordered On:</strong> {formatDate(dateOfOrder)}
        </p>

        {/* 📦 Delivery Info */}
        {isReturned && (
          <>
            <p className="mb-1">
              <strong>Delivered On:</strong> {formatDate(deliveredOn)}
            </p>
            <p className="mb-1">
              <strong>Return Pickup:</strong> {formatDate(returnPickupDate || returnRequest?.pickupDate)}
            </p>
          </>
        )}

        {isDelivered && (
          <p className="mb-1">
            <strong>Delivered On:</strong> {formatDate(deliveredOn)}
          </p>
        )}

        {!isDelivered && !isReturned && !isCancelled && expectedDelivery && (
          <p className="mb-1">
            <strong>Expected Delivery:</strong> {formatDate(expectedDelivery)}
          </p>
        )}

        <hr />

        {/* ℹ️ Info Summary Lines with new routes */}
        {isReturned && returnRequest && (
          <p className="mb-1 text-muted d-flex align-items-center gap-1">
            Product Returned
            <FaInfoCircle
              role="button"
              onClick={() => navigate(`/return-summary/${orderId}`)}
              title="View Return Summary"
              style={{ cursor: "pointer" }}
            />
          </p>
        )}

        {isCancelled && cancellationRequest && (
          <p className="mb-1 text-muted d-flex align-items-center gap-1">
            Order Cancelled
            <FaInfoCircle
              role="button"
              onClick={() => navigate(`/cancel-summary/${orderId}`)}
              title="View Cancellation Summary"
              style={{ cursor: "pointer" }}
            />
          </p>
        )}

        {escalation?.message && (
          <p className="mb-1 text-muted d-flex align-items-center gap-1">
            Issue Escalated
            <FaInfoCircle
              role="button"
              onClick={() => navigate(`/escalation-summary/${orderId}`)}
              title="View Escalation Summary"
              style={{ cursor: "pointer" }}
            />
          </p>
        )}

        {/* 🎯 Action Buttons */}
        <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center">
          {/* 🚨 Escalate */}
          <button
            className="btn btn-warning btn-sm d-flex align-items-center gap-1"
            onClick={() =>
              escalation?.message
                ? navigate(`/escalation-summary/${orderId}`)
                : navigate(`/escalate/${orderId}`)
            }
          >
            <FaExclamationTriangle />
            {escalation?.message ? "View Escalation" : "Escalate"}
          </button>

          {/* 🔁 Return */}
          <button
            className="btn btn-success btn-sm d-flex align-items-center gap-1"
            onClick={() => navigate(`/return/${orderId}`)}
            disabled={
              !isDelivered ||
              isReturned ||
              isCancelled ||
              !!returnRequest?.reason
            }
            title={
              !isDelivered
                ? "Only Delivered orders are eligible for return"
                : isReturned
                ? "Order already returned"
                : isCancelled
                ? "Cancelled orders cannot be returned"
                : returnRequest
                ? "Return already requested"
                : ""
            }
          >
            <FaUndo /> Return
          </button>

          {/* ❌ Cancel */}
          <button
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
            onClick={() => navigate(`/cancel/${orderId}`)}
            disabled={
              isDelivered ||
              isReturned ||
              isCancelled ||
              !!cancellationRequest?.reason
            }
            title={
              isDelivered
                ? "Delivered orders cannot be cancelled"
                : isReturned
                ? "Returned orders cannot be cancelled"
                : isCancelled
                ? "Order already cancelled"
                : cancellationRequest
                ? "Cancellation already requested"
                : ""
            }
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
