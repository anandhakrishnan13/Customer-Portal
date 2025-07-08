import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUndo, FaExclamationTriangle, FaTimes } from "react-icons/fa";

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
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Cancelled":
        return "secondary";
      case "Returned":
        return "info";
      case "Shipped":
        return "primary";
      case "Processing":
        return "warning";
      default:
        return "dark";
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{productName}</h5>
              <span
                className={`badge bg-${getStatusBadge(status)} rounded-pill px-3 py-2`}
                style={{ fontSize: "0.9rem" }}
              >
                {status}
              </span>
            </div>

            <p className="mb-1"><strong>Order ID:</strong> {orderId}</p>
            <p className="mb-1"><strong>Price:</strong> ₹{price}</p>
            <p className="mb-1"><strong>Ordered On:</strong> {formatDate(dateOfOrder)}</p>

            {status === "Returned" && (
              <>
                <p className="mb-1"><strong>Delivered On:</strong> {formatDate(deliveredOn)}</p>
                <p className="mb-1"><strong>Return Pickup:</strong> {formatDate(returnPickupDate)}</p>
              </>
            )}

            {status === "Delivered" && (
              <p className="mb-1"><strong>Delivered On:</strong> {formatDate(deliveredOn)}</p>
            )}

            {!["Delivered", "Returned", "Cancelled"].includes(status) && expectedDelivery && (
              <p className="mb-1"><strong>Expected Delivery:</strong> {formatDate(expectedDelivery)}</p>
            )}

            <hr />

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                onClick={() => navigate(`/escalate/${orderId}`)}
              >
                <FaExclamationTriangle /> Escalate
              </button>

              {status === "Delivered" && (
                <button
                  className="btn btn-success btn-sm d-flex align-items-center gap-1"
                  onClick={() => navigate(`/return/${orderId}`)}
                >
                  <FaUndo /> Return
                </button>
              )}

              {!["Delivered", "Returned", "Cancelled"].includes(status) && (
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                  onClick={() => navigate(`/cancel/${orderId}`)}
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
