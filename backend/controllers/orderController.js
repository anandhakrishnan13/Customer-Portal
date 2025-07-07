import Order from "../models/Order.js";

// 1️⃣ Get logged-in customer's orders
export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// 2️⃣ Escalate an issue
export const escalateIssue = async (req, res) => {
  const { orderId } = req.params;
  const { message } = req.body;

  try {
    const order = await Order.findOne({ orderId, customer: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Simulate escalation (you can later store in DB if needed)
    console.log(`Escalated issue for Order ${orderId}: ${message}`);

    res.json({ message: "Issue escalated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error escalating issue", error: err.message });
  }
};

// 3️⃣ Request return (simulate reverse pickup)
export const requestReturn = async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  try {
    const order = await Order.findOne({ orderId, customer: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const trackingId = "RTN-" + Math.floor(100000 + Math.random() * 900000);

    res.json({
      message: "Return request initiated",
      trackingId,
      orderId: order.orderId,
      reason,
      pickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing return", error: err.message });
  }
};

// 4️⃣ Request cancellation
export const requestCancellation = async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  try {
    const order = await Order.findOne({ orderId, customer: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update status if eligible (just simulating here)
    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled", reason });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order", error: err.message });
  }
};
