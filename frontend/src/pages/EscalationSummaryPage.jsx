import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import mockOrders from "../data/mockOrders";

const EscalationSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.orderId || !state.issue) {
    return (
      <div className="container mt-5">
        <h4>No escalation information found.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { orderId, issue } = state;
  const order = mockOrders.find((o) => o.orderId === orderId);
  const status = order ? order.status : "Unknown";

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-4">Escalation Summary</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{orderId}</td>
              </tr>
              <tr>
                <th>Selected Issue</th>
                <td>{issue}</td>
              </tr>
              <tr>
                <th>Order Status</th>
                <td>{status}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-danger">
            Our customer service team will be contacting you shortly.
          </p>

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

export default EscalationSummaryPage;
