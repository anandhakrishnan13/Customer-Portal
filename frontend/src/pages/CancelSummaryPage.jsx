import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CancelSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.orderId || !state.reason) {
    return (
      <div className="container mt-5">
        <h4>No cancellation information found.</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { orderId, reason, cancellationDate } = state;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-4">Cancellation Summary</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{orderId}</td>
              </tr>
              <tr>
                <th>Reason for Cancellation</th>
                <td>{reason}</td>
              </tr>
              <tr>
                <th>Cancellation Date</th>
                <td>{formatDate(cancellationDate)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-danger">⚠️ Your order cancellation request has been submitted.</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelSummaryPage;
