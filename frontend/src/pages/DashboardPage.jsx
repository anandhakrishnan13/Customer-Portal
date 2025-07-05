import React, { useState } from 'react';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';
import mockOrders from '../data/mockOrders';

const DashboardPage = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleEscalate = (orderId) => {
    alert(`Escalate issue for ${orderId}`);
  };

  const handleCancel = (orderId) => {
    alert(`Request cancellation for ${orderId}`);
  };

  const handleReturn = (orderId) => {
    alert(`Request return for ${orderId}`);
  };

  return (
    <>
    <Navbar />
    <div>
      <h2 className="mb-4 text-center">My Orders</h2>
      {orders.length > 0 ? (
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
