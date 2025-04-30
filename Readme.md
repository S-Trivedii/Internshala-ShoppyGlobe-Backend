# 🛍️ ShoppyGlobe E-Commerce API

This is the backend API for **ShoppyGlobe**, an e-commerce platform. Built using **Node.js**, **Express**, and **MongoDB**, it includes authentication, product management, and cart functionality.

---

## 📁 Features

- ✅ User Registration & Login (JWT Authentication)
- 📦 Product CRUD (Create, Read, Update, Delete)
- 🛒 Cart Management (Add, Update, Delete)
- 🔐 Protected Routes for Cart Operations
- 📡 RESTful API with structured responses
- ✅ Tested via ThunderClient

---

## 🧪 Endpoints

### 🧍‍♂️ User Routes

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Register a new user     |
| POST   | `/login`    | Login and get JWT token |

---

### 📦 Product Routes

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/products`     | Get all products           |
| GET    | `/products/:id` | Get a single product by ID |
| POST   | `/products`     | Create a new product       |
| PUT    | `/products/:id` | Update product by ID       |
| DELETE | `/products/:id` | Delete product by ID       |

---

### 🛒 Cart Routes (Protected)

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/cart`     | Add product to cart            |
| PUT    | `/cart/:id` | Update quantity of a cart item |
| DELETE | `/cart/:id` | Delete item from cart          |

> 🛡️ All cart routes require a valid `Authorization: Bearer <token>` header.

---

## 🔐 Authentication

- JWT is used for securing protected routes.
- On login, a token is returned which must be sent in headers for cart actions.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Testing**: ThunderClient

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/S-Trivedii/Internshala-ShoppyGlobe-Backend.git
cd Internshala-ShoppyGlobe-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables Create a .env file:**

```bash
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

4. **Run the server**

```bash
npm run dev
```
