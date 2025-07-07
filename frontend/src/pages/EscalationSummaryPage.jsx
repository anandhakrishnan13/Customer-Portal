import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchMyOrders } from "../services/api"; // ✅ using live data

const EscalationSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const { orderId, issue } = state || {};

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orders = await fetchMyOrders();
        const found = orders.find((o) => o.orderId === orderId);
        setOrder(found || null);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    if (orderId) getOrderDetails();
  }, [orderId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  if (!orderId || !issue) {
    return (
      <div className="container mt-5">
        <h4>No escalation information found.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

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
                <td>{order?.status || "Loading..."}</td>
              </tr>
              <tr>
                <th>Escalated On</th>
                <td>{formatDate(new Date())}</td>
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
