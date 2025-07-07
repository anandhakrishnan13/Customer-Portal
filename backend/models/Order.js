import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    productName: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Returned"], default: "Pending" },
    price: { type: Number, required: true },
    dateOfOrder: { type: Date, required: true },
    expectedDelivery: { type: Date },
    returnPickupDate: { type: Date },
    deliveredOn: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
