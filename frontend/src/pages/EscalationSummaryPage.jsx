import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchMyOrders } from "../services/api";

const EscalationSummaryPage = () => {
  const { state } = useLocation();
  const { orderId: paramOrderId } = useParams(); // ✅ get from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [issue, setIssue] = useState(state?.issue || ""); // fallback
  const [loading, setLoading] = useState(true);

  const orderId = paramOrderId || state?.orderId;

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orders = await fetchMyOrders();
        const found = orders.find((o) => o.orderId === orderId);
        if (found) {
          setOrder(found);
          if (!issue && found.escalation?.message) {
            setIssue(found.escalation.message);
          }
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId, issue]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading escalation summary...</p>
      </div>
    );
  }

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
                <td>{order?.status || "Unknown"}</td>
              </tr>
              <tr>
                <th>Escalated On</th>
                <td>{formatDate(order?.escalation?.date || new Date())}</td>
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
