import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    productName: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Out for Delivery", "Returned"], default: "Pending" },
    price: { type: Number, required: true },
    dateOfOrder: { type: Date, required: true },
    expectedDelivery: { type: Date },
    returnPickupDate: { type: Date },
    deliveredOn: { type: Date },
    escalation: { message: String, escalatedAt: {
    type: Date,
    default: Date.now,
  },},
    returnRequest: { reason: String, trackingId: String, pickupDate: Date, logisticsPartner: String, requestedAt: {
    type: Date,
    default: Date.now,
  }, },
    cancellationRequest: { reason: String, requestedAt: {
    type: Date,
    default: Date.now,
  },}

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
