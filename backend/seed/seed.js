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

    // 🔸 Customer 1
    const user1 = await User.create({
      name: "Anand Test",
      email: "anand@example.com",
      phone: "9999999999",
      password: "test1234",
    });

    await Order.create([
      {
        orderId: "ORD100001",
        customer: user1._id,
        productName: "Smart Foam Pillow",
        status: "Delivered",
        price: 999,
        dateOfOrder: new Date("2024-06-15"),
        expectedDelivery: new Date("2024-06-20"),
        deliveredOn: new Date("2024-06-20"),
      },
      {
        orderId: "ORD100002",
        customer: user1._id,
        productName: "Cooling Mattress",
        status: "Shipped",
        price: 4999,
        dateOfOrder: new Date("2024-07-01"),
        expectedDelivery: new Date("2024-07-06"),
      },
      {
        orderId: "ORD100003",
        customer: user1._id,
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
        customer: user1._id,
        productName: "Ergo Neck Pillow",
        status: "Cancelled",
        price: 1299,
        dateOfOrder: new Date("2024-05-20"),
        expectedDelivery: new Date("2024-05-25"),
      },
    ]);

    // 🔸 Customer 2
    const user2 = await User.create({
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "8888888888",
      password: "priya123",
    });

    await Order.create([
      {
        orderId: "ORD200001",
        customer: user2._id,
        productName: "Memory Foam Mattress",
        status: "Delivered",
        price: 8999,
        dateOfOrder: new Date("2024-06-18"),
        expectedDelivery: new Date("2024-06-23"),
        deliveredOn: new Date("2024-06-23"),
      },
      {
        orderId: "ORD200002",
        customer: user2._id,
        productName: "Organic Cotton Pillow",
        status: "Out for Delivery",
        price: 799,
        dateOfOrder: new Date("2024-07-03"),
        expectedDelivery: new Date("2024-07-08"),
      },
      {
        orderId: "ORD200003",
        customer: user2._id,
        productName: "Silk Bedsheet Set",
        status: "Cancelled",
        price: 3499,
        dateOfOrder: new Date("2024-06-05"),
        expectedDelivery: new Date("2024-06-10"),
      },
      {
        orderId: "ORD200004",
        customer: user2._id,
        productName: "Cooling Gel Pillow",
        status: "Returned",
        price: 1199,
        dateOfOrder: new Date("2024-05-15"),
        expectedDelivery: new Date("2024-05-20"),
        deliveredOn: new Date("2024-05-20"),
        returnPickupDate: new Date("2024-05-24"),
      },
    ]);

    // 🔸 Customer 3
    const user3 = await User.create({
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "7777777777",
      password: "ravi123",
    });

    await Order.create([
      {
        orderId: "ORD300001",
        customer: user3._id,
        productName: "Travel Neck Pillow",
        status: "Delivered",
        price: 499,
        dateOfOrder: new Date("2024-06-10"),
        expectedDelivery: new Date("2024-06-15"),
        deliveredOn: new Date("2024-06-15"),
      },
      {
        orderId: "ORD300002",
        customer: user3._id,
        productName: "Zero Gravity Mattress",
        status: "Shipped",
        price: 10999,
        dateOfOrder: new Date("2024-07-02"),
        expectedDelivery: new Date("2024-07-07"),
      },
      {
        orderId: "ORD300003",
        customer: user3._id,
        productName: "Waterproof Mattress Protector",
        status: "Cancelled",
        price: 999,
        dateOfOrder: new Date("2024-06-12"),
        expectedDelivery: new Date("2024-06-17"),
      },
      {
        orderId: "ORD300004",
        customer: user3._id,
        productName: "Anti-Allergy Pillow",
        status: "Pending",
        price: 1299,
        dateOfOrder: new Date("2024-06-01"),
        expectedDelivery: new Date("2024-06-06"),
        deliveredOn: new Date("2024-06-06"),
        returnPickupDate: new Date("2024-06-10"),
      },
    ]);

    console.log("✅ Seeded 3 users and 12 orders successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder failed:", err.message);
    process.exit(1);
  }
};

seedData();
