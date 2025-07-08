import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';
import { fetchMyOrders } from '../services/api';
import {jwtDecode} from 'jwt-decode'; // ✅ Add this if not already installed

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGuest, setIsGuest] = useState(false); // ✅ Track guest
  console.log("Orders:", orders);
  const handleEscalate = (orderId) => {
    alert(`Escalate issue for ${orderId}`);
  };

  const handleCancel = (orderId) => {
    alert(`Request cancellation for ${orderId}`);
  };

  const handleReturn = (orderId) => {
    alert(`Request return for ${orderId}`);
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.guest === true) {
            setIsGuest(true);
          }
        }

        const data = await fetchMyOrders();
        const sorted = data.sort((a, b) => new Date(b.dateOfOrder) - new Date(a.dateOfOrder));
        setOrders(sorted);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{backgroundColor: "blue", color: "white"}}>
        <h2 className="mb-4 text-center">My Orders</h2>

        {/* ✅ Guest login note */}
        {isGuest && (
          <div className="alert alert-warning text-center">
            ⚠️ You are logged in using an <strong>Order ID</strong>. You can only view and manage that specific order.
            <br />
            To view all orders, please log in using your <strong>email/phone & password</strong>.
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onEscalate={handleEscalate}
              onCancel={handleCancel}
              onReturn={handleReturn}
            />
          ))
        ) : (
          <div className="alert alert-info text-center">No orders found.</div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
