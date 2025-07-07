import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ReturnSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container mt-5">
        <h4>No return information found.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { orderId, productName, trackingId, reason, pickupDate } = state;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-4">Return Summary</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{orderId}</td>
              </tr>
              <tr>
                <th>Product Name</th>
                <td>{productName}</td>
              </tr>
              <tr>
                <th>Tracking ID</th>
                <td>{trackingId}</td>
              </tr>
              <tr>
                <th>Reason for Return</th>
                <td>{reason}</td>
              </tr>
              <tr>
                <th>Scheduled Pickup Date</th>
                <td>{pickupDate}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnSummaryPage;
