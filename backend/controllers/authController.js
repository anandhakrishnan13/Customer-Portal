import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Order from "../models/Order.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Login with Email/Phone + Password
export const loginWithPassword = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user || !user.password)
      return res.status(400).json({ message: "User not found or no password set" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login with Email/Phone + Order ID
export const loginWithOrderId = async (req, res) => {
  const { identifier, orderId } = req.body;

  try {
    const user = await Customer.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const order = await Order.findOne({ orderId, customer: user._id });

    if (!order)
      return res.status(401).json({ message: "Invalid order ID for this user" });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
