import Order from "../models/Order.js";



// 1️⃣ Get logged-in customer's orders
export const getCustomerOrders = async (req, res) => {
  try {
    console.log("🔐 Authenticated User:", req.user);

    if (req.user.guest && req.user.orderId) {
      // Guest login: return only that order
      const order = await Order.findOne({ orderId: req.user.orderId });
      return res.json(order ? [order] : []);
    }

    // Full login: return all user's orders
    const orders = await Order.find({ customer: req.user._id }).lean();
    res.json(orders);
  } catch (err) {
    console.error("getCustomerOrders failed:", err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// 2️⃣ Escalate an issue
export const escalateIssue = async (req, res) => {
  const { orderId } = req.params;
  const { message } = req.body;

  try {
    const order = req.user.guest
      ? await Order.findOne({ orderId: req.user.orderId })
      : await Order.findOne({ orderId, customer: req.user._id });

    if (!order || (req.user.guest && req.user.orderId !== orderId)) {
      return res.status(404).json({ message: "Order not found or access denied" });
    }
    order.escalation = {
      message,
      escalatedAt: new Date(),
    };
    order.escalationHistory = order.escalationHistory || [];
    order.escalationHistory.push({ message });
    await order.save();

    console.log(`📣 Escalated issue for Order ${orderId}: ${message}`);
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
    const order = req.user.guest
      ? await Order.findOne({ orderId: req.user.orderId })
      : await Order.findOne({ orderId, customer: req.user._id });

    if (!order || (req.user.guest && req.user.orderId !== orderId)) {
      return res.status(404).json({ message: "Order not found or access denied" });
    }

    if (!order.deliveredOn) {
      return res.status(400).json({ message: "Order not delivered yet" });
    }

    const deliveredDate = new Date(order.deliveredOn);
    const maxReturnDate = new Date(deliveredDate);
    maxReturnDate.setDate(deliveredDate.getDate() + 15);

    // Generate random date between deliveredOn and deliveredOn + 15
    const pickupDate = new Date(
      deliveredDate.getTime() +
      Math.random() * (maxReturnDate.getTime() - deliveredDate.getTime())
    );
    const partners = ["Delhivery", "Ekart", "Bluedart", "Xpressbees"];
    const selectedPartner = partners[Math.floor(Math.random() * partners.length)];

    const trackingId = "RTN-" + Math.floor(100000 + Math.random() * 900000);

    order.returnRequest = {
      reason,
      trackingId,
      pickupDate,
      logisticsPartner: selectedPartner,
      requestedAt: new Date(),
    };
    order.returnPickupDate = pickupDate
    order.status = "Returned";
    await order.save();

    res.json({
      message: "Return request initiated",
      trackingId,
      orderId: order.orderId,
      reason,
      pickupDate,
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
    const order = req.user.guest
      ? await Order.findOne({ orderId: req.user.orderId })
      : await Order.findOne({ orderId, customer: req.user._id });

    if (!order || (req.user.guest && req.user.orderId !== orderId)) {
      return res.status(404).json({ message: "Order not found or access denied" });
    }

    order.cancellationRequest = {
      reason,
      requestedAt: new Date(),
    };
    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled", reason });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order", error: err.message });
  }
};

// 5️⃣ Get a single order by orderId
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = req.user.guest
      ? await Order.findOne({ orderId: req.user.orderId })
      : await Order.findOne({ orderId, customer: req.user._id });

    if (!order || (req.user.guest && req.user.orderId !== orderId)) {
      return res.status(404).json({ message: "Order not found or access denied" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};
