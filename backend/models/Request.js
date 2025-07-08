import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["return", "cancel", "escalate"],
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // guest users may not have a user ID
  },
  reason: {
    type: String,
    required: true,
  },
  trackingId: String,
  pickupDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Request", requestSchema);
