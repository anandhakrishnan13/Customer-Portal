// frontend/src/api/api.js
// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://customer-portal-a9hg.onrender.com/api"

export const loginWithPassword = async (identifier, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const loginWithOrderId = async (identifier, orderId) => {
  const res = await fetch(`${API_BASE_URL}/auth/login-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, orderId }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const fetchMyOrders = async () => {
  const token = localStorage.getItem("token");
  console.log("Using token:", token);
  const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error fetching orders");
  return res.json();
};

export const fetchOrderById = async (orderId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error fetching order by ID");
  return res.json();
};

