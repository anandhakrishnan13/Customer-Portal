import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';
import { fetchMyOrders } from '../services/api';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const data = await fetchMyOrders();
        setOrders(data);
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
      <div className="container mt-4">
        <h2 className="mb-4 text-center">My Orders</h2>

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
