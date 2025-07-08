import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();

    // Helper to generate orderId with prefix and number
    const generateOrderId = (prefix, num) =>
      `${prefix}${num.toString().padStart(6, "0")}`;

    // Customer 1
    const user1 = await User.create({
      name: "Anand Test",
      email: "anand@example.com",
      phone: "9999999999",
      password: "test1234",
    });

    await Order.create([
      {
        orderId: generateOrderId("ORD1", 1),
        customer: user1._id,
        productName: "Smart Foam Pillow",
        status: "Delivered",
        price: 999,
        dateOfOrder: new Date("2024-05-10"),
        expectedDelivery: new Date("2024-05-15"),
        deliveredOn: new Date("2024-05-15"),
      },
      {
        orderId: generateOrderId("ORD1", 2),
        customer: user1._id,
        productName: "Luxury Bamboo Bedsheet",
        status: "Delivered",
        price: 2999,
        dateOfOrder: new Date("2024-05-20"),
        expectedDelivery: new Date("2024-05-25"),
        deliveredOn: new Date("2024-05-25"),
      },
      {
        orderId: generateOrderId("ORD1", 3),
        customer: user1._id,
        productName: "Cooling Mattress",
        status: "Shipped",
        price: 4999,
        dateOfOrder: new Date("2024-06-01"),
        expectedDelivery: new Date("2024-06-06"),
      },
      {
        orderId: generateOrderId("ORD1", 4),
        customer: user1._id,
        productName: "Ergo Neck Pillow",
        status: "Shipped",
        price: 1299,
        dateOfOrder: new Date("2024-06-05"),
        expectedDelivery: new Date("2024-06-10"),
      },
    ]);

    // Customer 2 - Akku
    const user2 = await User.create({
      name: "Akku",
      email: "akku@example.com",
      phone: "8888888888",
      password: "akku123",
    });

    await Order.create([
      {
        orderId: generateOrderId("ORD2", 1),
        customer: user2._id,
        productName: "Memory Foam Mattress",
        status: "Delivered",
        price: 8999,
        dateOfOrder: new Date("2024-05-12"),
        expectedDelivery: new Date("2024-05-17"),
        deliveredOn: new Date("2024-05-17"),
      },
      {
        orderId: generateOrderId("ORD2", 2),
        customer: user2._id,
        productName: "Organic Cotton Pillow",
        status: "Delivered",
        price: 799,
        dateOfOrder: new Date("2024-05-22"),
        expectedDelivery: new Date("2024-05-27"),
        deliveredOn: new Date("2024-05-27"),
      },
      {
        orderId: generateOrderId("ORD2", 3),
        customer: user2._id,
        productName: "Silk Bedsheet Set",
        status: "Shipped",
        price: 3499,
        dateOfOrder: new Date("2024-06-02"),
        expectedDelivery: new Date("2024-06-07"),
      },
      {
        orderId: generateOrderId("ORD2", 4),
        customer: user2._id,
        productName: "Cooling Gel Pillow",
        status: "Shipped",
        price: 1199,
        dateOfOrder: new Date("2024-06-10"),
        expectedDelivery: new Date("2024-06-15"),
      },
    ]);

    // Customer 3 - Ak
    const user3 = await User.create({
      name: "Ak",
      email: "ak@example.com",
      phone: "7777777777",
      password: "ak123",
    });

    await Order.create([
      {
        orderId: generateOrderId("ORD3", 1),
        customer: user3._id,
        productName: "Travel Neck Pillow",
        status: "Delivered",
        price: 499,
        dateOfOrder: new Date("2024-05-05"),
        expectedDelivery: new Date("2024-05-10"),
        deliveredOn: new Date("2024-05-10"),
      },
      {
        orderId: generateOrderId("ORD3", 2),
        customer: user3._id,
        productName: "Anti-Allergy Pillow",
        status: "Delivered",
        price: 1299,
        dateOfOrder: new Date("2024-05-15"),
        expectedDelivery: new Date("2024-05-20"),
        deliveredOn: new Date("2024-05-20"),
      },
      {
        orderId: generateOrderId("ORD3", 3),
        customer: user3._id,
        productName: "Zero Gravity Mattress",
        status: "Shipped",
        price: 10999,
        dateOfOrder: new Date("2024-06-01"),
        expectedDelivery: new Date("2024-06-06"),
      },
      {
        orderId: generateOrderId("ORD3", 4),
        customer: user3._id,
        productName: "Waterproof Mattress Protector",
        status: "Shipped",
        price: 999,
        dateOfOrder: new Date("2024-06-08"),
        expectedDelivery: new Date("2024-06-13"),
      },
    ]);

    console.log("✅ Seeded 3 users with updated names and orders");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder failed:", err.message);
    process.exit(1);
  }
};

seedData();
