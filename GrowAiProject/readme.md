# 📊 GrowthProAI – Full Stack Intern Assignment

This project simulates a local business dashboard where users can enter business information and receive SEO-enhanced summaries with Google-like ratings and reviews.

---

## 🧠 Tech Stack

- **Frontend**: React (CRA), CSS (no frameworks)
- **Backend**: Node.js, Express.js
- **API Communication**: REST
- **No Database**: All data is simulated

---

## 🚀 Features

- Input business name and location
- Fetch simulated Google rating, reviews, and AI-style SEO headlines
- "Regenerate Headline" feature for dynamic headline generation
- Fully responsive UI (mobile-friendly)
- Loading spinner during async operations

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup

Navigate to the `backend/` directory, install dependencies, and start the server:

```bash
cd backend
npm install
node index.js
```

The backend will be running at: `http://localhost:3001`

---

## 📦 Folder Structure

```
GrowAiProject/
├── backend/        → Node.js server (Express APIs)
├── frontend/       → React app (CRA + plain CSS)
```

---

## ✅ Endpoints

### `POST /business-data`

Request:

```json
{ "name": "Cake & Co", "location": "Mumbai" }
```

Response:

```json
{
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Top Choice in 2025"
}
```

---

### `GET /regenerate-headline?name=...&location=...`

Response:

```json
{ "headline": "Discover the Magic of Cake & Co in Mumbai" }
```

---

## Happy Coding!!