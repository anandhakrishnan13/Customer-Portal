# 🛍️ Customer Order Portal (MERN Stack)

A customer-facing web application that allows users to view and manage their orders including **returns**, **cancellations**, and **issue escalations**. Supports both registered logins and guest access via Order ID.

---

## 🚀 Tech Stack

- **Frontend**: React.js + Bootstrap
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based (Token stored in localStorage)

---

## ✨ Key Features

### 👤 User Login
- Supports full login with email/password.
- Supports guest login via Order ID for tracking individual orders.

### 👤 Users
-Email: anand@example.com
Phone: 9999999999
Password: test1234
Order IDs:
ORD100001
ORD100002
ORD100003
ORD100004 

-Email: akku@example.com
Phone: 8888888888
Password: akku123
Order IDs:
ORD200001 
ORD200002 
ORD200003
ORD200004

-Email: ak@example.com
Phone: 7777777777
Password: ak123
Order IDs:
ORD300001 
ORD300002
ORD300003
ORD300004

### 📦 Order Management
- View orders, status (Delivered, Cancelled, Returned, etc.), and delivery details.
- All orders are displayed in descending order of date.

### 🔁 Return Orders
- Returns allowed only for `Delivered` orders.
- Enforces 15-day return window from delivery date.
- Generates unique return tracking ID and simulated pickup date.

### ❌ Cancel Orders
- Cancellations allowed only before delivery.
- Cancellation reason is stored with timestamp.

### 📣 Escalate Issues
- Any order can be escalated.
- Escalation message and history are saved.
- View escalation summary any time.

### ℹ️ Summary Pages
- Return, Cancel, and Escalation summary pages available for each order.
- Easy access via `(i)` icon on the dashboard.

### 🔐 Secure & Role-Aware
- Registered users can view **all their orders**.
- Guest users can view/manage only the **specific order** they entered.

---

## 📂 Folder Structure
Customer-portal/
└── frontend/
└── src/
├── components/
│ ├── Navbar.jsx
│ └── OrderCard.jsx
├── pages/
│ ├── DashboardPage.jsx
│ ├── ReturnPage.jsx
│ ├── CancelPage.jsx
│ ├── EscalationPage.jsx
│ ├── ReturnSummaryPage.jsx
│ ├── CancelSummaryPage.jsx
│ └── EscalationSummaryPage.jsx
│ └── LoginPage.jsx
│ └──LoginPage.css
└── services/
└── api.js

└── backend/
├── config/
│ └──db.js
├── controllers/
│ └── orderController.js
│ └── authController.js
├── models/
│ └── Order.js
│ └── Request.js
│ └── User.js
├── routes/
│ └── orderRoutes.js
│ └── authRoutes.js
└── middleware/
│ └── authMiddleware.js
└── seed
│ └── seed.js

---

## 📦 Installation & Setup

### Backend
```bash
cd backend
npm install
# Add MongoDB URI and JWT secret in .env
npm start
cd frontend
npm install
npm run dev
