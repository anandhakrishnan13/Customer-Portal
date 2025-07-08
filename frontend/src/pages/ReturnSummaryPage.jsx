import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchOrderById } from "../services/api";

const ReturnSummaryPage = () => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      if (state) return; // no need if already available
      try {
        const fetched = await fetchOrderById(orderId);
        if (fetched?.returnRequest) {
          setOrder(fetched);
        } else {
          setError("No return found for this order.");
        }
      } catch (err) {
        console.error("Error loading return info:", err);
        setError("Failed to fetch return information.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, state]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const returnData = state || {
    orderId: order?.orderId,
    productName: order?.productName,
    trackingId: order?.returnRequest?.trackingId,
    reason: order?.returnRequest?.reason,
    pickupDate: order?.returnRequest?.pickupDate,
    logisticsPartner: order?.returnRequest?.logisticsPartner || "Not assigned",
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          Loading return summary...
        </div>
      </>
    );
  }

  if (error || !returnData.orderId) {
    return (
      <div className="container mt-5">
        <h4>{error || "No return information found."}</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { productName, trackingId, reason, pickupDate, logisticsPartner } =
    returnData;

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
                <td>{trackingId || "Not assigned yet"}</td>
              </tr>
              <tr>
                <th>Reason for Return</th>
                <td>{reason}</td>
              </tr>
              <tr>
                <th>Scheduled Pickup Date</th>
                <td>{formatDate(pickupDate)}</td>
              </tr>
              <tr>
                <th>Logistics Partner</th>
                <td>{logisticsPartner}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-success">
            ✅ Your return has been scheduled successfully!
          </p>

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

export default ReturnSummaryPage;
