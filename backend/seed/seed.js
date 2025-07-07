import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    // Clear previous data
    await User.deleteMany();
    await Order.deleteMany();

    // Create User
    const user = await User.create({
      name: "Anand Test",
      email: "anand@example.com",
      phone: "9999999999",
      password: "test1234", // will be hashed automatically
    });

    // Create Orders
    await Order.create([
      {
        orderId: "ORD100001",
        customer: user._id,
        productName: "Smart Foam Pillow",
        status: "Delivered",
        price: 999,
        dateOfOrder: new Date("2024-06-15"),
        expectedDelivery: new Date("2024-06-20"),
        deliveredOn: new Date("2024-06-20"),
      },
      {
        orderId: "ORD100002",
        customer: user._id,
        productName: "Cooling Mattress",
        status: "Shipped",
        price: 4999,
        dateOfOrder: new Date("2024-07-01"),
        expectedDelivery: new Date("2024-07-06"),
      },
      {
        orderId: "ORD100003",
        customer: user._id,
        productName: "Luxury Bamboo Bedsheet",
        status: "Returned",
        price: 2999,
        dateOfOrder: new Date("2024-06-10"),
        expectedDelivery: new Date("2024-06-15"),
        deliveredOn: new Date("2024-06-15"),
        returnPickupDate: new Date("2024-06-20"),
      },
      {
        orderId: "ORD100004",
        customer: user._id,
        productName: "Ergo Neck Pillow",
        status: "Cancelled",
        price: 1299,
        dateOfOrder: new Date("2024-05-20"),
        expectedDelivery: new Date("2024-05-25"),
      },
    ]);

    console.log("✅ Seeder ran successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder failed:", err.message);
    process.exit(1);
  }
};

seedData();
