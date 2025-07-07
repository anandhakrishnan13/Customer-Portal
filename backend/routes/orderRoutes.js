import express from "express";
import {
  getCustomerOrders,
  escalateIssue,
  requestReturn,
  requestCancellation,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protected: Get logged-in customer's orders
router.get("/my-orders", protect, getCustomerOrders);

// 🔐 Escalate issue
router.post("/escalate/:orderId", protect, escalateIssue);

// 🔐 Request a return
router.post("/return/:orderId", protect, requestReturn);

// 🔐 Request a cancellation
router.post("/cancel/:orderId", protect, requestCancellation);

export default router;
