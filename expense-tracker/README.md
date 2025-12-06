# 📊 Smart Expense Tracker — MERN Web App

A modern, full-stack **MERN (MongoDB + Express + React + Node)** application to track **expenses, income, spending patterns, and monthly trends**.
Designed with **JWT authentication**, **robust backend APIs**, **MongoDB aggregation**, **charts**, **timelines**, and a polished **Tailwind UI**.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Password hashing (bcrypt)
* JWT token-based authentication
* Protected routes (backend & frontend)

---

### 💸 Expense Management

* Add expenses and income
* Edit existing records
* Delete items with confirmation modal
* Full CRUD with validations
* Category icons + badges
* Optimistic UI updates

---

### 🔍 Filtering, Sorting & Search

* Search by keyword
* Filter by month, category
* Sort by date or amount
* Paginated API-ready structure

---

### 📊 Visual Insights

* Recharts Pie Chart (category distribution)
* Recharts Bar Chart (monthly income vs expense)
* Timeline visualized using **react-chrono**

---

### 🧭 Onboarding & UX

* Onboarding carousel
* Toast notifications
* Global loading overlay
* Error boundary
* Mobile-responsive Tailwind UI

---

### 🗄️ Backend API (Express + MongoDB)

* REST API with modular routing
* Controllers, routes, middlewares
* MongoDB aggregation pipelines
* Joi validation
* Error handling middleware

---

## 🏗️ Tech Stack

### Frontend

* React + Vite
* React Router
* TailwindCSS
* React Hook Form + Yup
* Axios
* Recharts
* React Chrono
* React Toastify

### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB
* JWT Authentication
* Joi Validation
* CORS
* dotenv

---

# 📁 Folder Structure

```
smart-expense-tracker/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── context/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env
```

---

# 🔌 Backend API Documentation

### Auth

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register new user       |
| POST   | `/api/auth/login`  | Login user & return JWT |

---

### Expense APIs

| Method | Endpoint                                | Description                           |
| ------ | --------------------------------------- | ------------------------------------- |
| GET    | `/api/expenses`                         | Get all expenses for logged-in user   |
| GET    | `/api/expenses/:id`                     | Get single expense                    |
| POST   | `/api/expenses`                         | Create new expense                    |
| PUT    | `/api/expenses/:id`                     | Update expense                        |
| DELETE | `/api/expenses/:id`                     | Delete one                            |
| DELETE | `/api/expenses`                         | Delete ALL expenses                   |
| GET    | `/api/expenses/search?keyword=`         | Search expenses                       |
| GET    | `/api/expenses/filter?category=&month=` | Filter                                |
| GET    | `/api/expenses/sort?by=amount`          | Sort                                  |
| GET    | `/api/expenses/summary`                 | Get totals (income, expense, balance) |
| GET    | `/api/expenses/statistics?months=6`     | Aggregated category & month stats     |

---

# ⚙️ Environment Variables

## Backend `.env`

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/expense
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
```

## Frontend `.env`

```
VITE_API_BASE=http://localhost:5000
```

---

# 🛠️ Installation & Setup

## 1️⃣ Clone repository

```bash
git clone https://github.com/21lj/smart-expense-tracker.git
cd smart-expense-tracker
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

App runs at:

* **Frontend** → `http://localhost:5173`
* **Backend** → `http://localhost:5000`

---

# 🧪 Testing API

Using Postman:

### Create user:

```
POST /api/auth/signup
{
  "name": "test",
  "email": "test@test.com",
  "password": "123456"
}
```

### Login:

```
POST /api/auth/login
```

Returns:

```
{
  "token": "jwt_here",
  "user": { ... }
}
```

Attach token to all protected routes:

```
Authorization: Bearer <token>
```

---

# 🎨 Screenshots (Add yours)

```
📌 Dashboard Overview
📌 Add Expense Form
📌 Charts & Timeline
📌 Login / Signup
```

---

# 🚀 Deployment Guide

## Deploy Backend (Render)

1. Go to [https://render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub Repo
4. Environment = Node
5. Add `.env` variables
6. Build Command:

```
npm install
```

7. Start Command:

```
node server.js
```

---

## Deploy Frontend (Render Static Site)

1. Create new Static Site
2. Build Command:

```
npm run build
```

3. Publish Directory:

```
dist
```

4. Add env:

```
VITE_API_BASE=https://your-backend-url.onrender.com
```

---

# 🚨 Troubleshooting

### ❌ Expenses disappear on refresh

Fix: ensure `useExpenses` calls `fetchList()` inside `useEffect`.

### ❌ CORS error

Update backend CORS:

```js
cors({ origin: process.env.CORS_ORIGIN, credentials: true })
```

### ❌ JWT invalid

Make sure frontend sends:

```
Authorization: Bearer <token>
```

---

# 🏁 Final Notes

This project is production-ready and includes:

✔ Clean codebase
✔ Scalable architecture
✔ Modern UI
✔ Secure auth
✔ Real analytics via MongoDB aggregation


---

