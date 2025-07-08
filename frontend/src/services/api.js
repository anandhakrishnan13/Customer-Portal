// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://customer-portal-a9hg.onrender.com"

export const loginWithPassword = async (identifier, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const loginWithOrderId = async (identifier, orderId) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login-order`, {
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
  const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error fetching orders");
  return res.json();
};

export const fetchOrderById = async (orderId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error fetching order by ID");
  return res.json();
};

// Submit a return request
export const requestReturn = async (orderId, reason) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/orders/return/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error("Error submitting return request");
  return res.json();
};

// Submit an escalation request
export const escalateIssue = async (orderId, message) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/orders/escalate/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Error submitting escalation");
  return res.json();
};

// Submit a cancellation request
export const requestCancellation = async (orderId, reason) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/orders/cancel/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error("Error submitting cancellation request");
  return res.json();
};
