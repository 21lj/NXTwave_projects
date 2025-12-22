# Product Listing Page (PLP) – Appscrip Assignment

A responsive, SEO-optimized Product Listing Page built with **React (JavaScript)** and **pure CSS**, faithfully translating the provided Figma design into clean, maintainable code.

This project demonstrates front-end fundamentals: semantic HTML, responsive layouts, minimal dependencies, clean architecture, and real-world data integration.


---

## Live Demo

🔗 **Live Site:**
[Product_Listing_Page](https://plp-2.onrender.com/)


---

## ✨ Features

* Responsive Product Listing Page (Desktop / Tablet / Mobile)
* Clean component-based architecture
* Dynamic product data via Fake Store API
* Category-based filtering
* SEO-friendly markup
* Minimal DOM depth & zero UI frameworks
* Production-ready folder structure

---

## 🧱 Tech Stack

* **React (Create React App)**
* **JavaScript (ES6+)**
* **CSS (Flexbox + Grid)**
* **Fake Store API** (public mock API)
* **Vrcel** (deployment)
* **Git & GitHub** (version control)

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.js
│   ├── Filters.js
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   └── Footer.js
│
├── hooks/             # Custom React hooks
│   └── useProducts.js
│
├── utils/             # Pure utility functions
│   └── filterProducts.js
│
├── App.js             # Root application component
├── App.css            # Layout & responsive styles
├── index.js           # Application entry point
└── index.css          # Global resets
```

This separation ensures scalability, readability, and testability.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/21lijo/plp-2.git
cd Appscrip-task-yourname
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

The app runs at:
`http://localhost:3000`

---

## 🌐 Deployment

The project is deployed using **Netlify**.

### Steps:

1. Run:

   ```bash
   npm run build
   ```
2. Upload the `/build` folder to Netlify **or**
3. Connect the GitHub repository for auto-deploys

---

## 🔍 SEO & Performance Considerations

* Semantic HTML elements (`header`, `main`, `section`, `article`, `footer`)
* Descriptive meta tags
* Optimized images with `alt` text
* Lazy loading for product images
* Minimal DOM nesting
* No unnecessary third-party UI libraries

---

## 🎯 Design Reference

UI implemented based on the provided Figma design:
[https://www.figma.com/file/N0Tv7yYLf3kfMLQjUncUlx/Design-Task---PLP](https://www.figma.com/file/N0Tv7yYLf3kfMLQjUncUlx/Design-Task---PLP)

---

## 📌 Notes

* Written entirely in **JavaScript** (no TypeScript).
* Styling uses **pure CSS** (no Bootstrap / Tailwind).
* Code emphasizes clarity over abstraction.
* Designed for easy extension (sorting, pagination, SSR, etc.).

---

## 👤 Author

**Lijo**

---

