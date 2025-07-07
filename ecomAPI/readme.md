# Simple E-commerce API

This project is a full-stack e-commerce platform built using Node.js, Express, MongoDB, and a static frontend interface. It supports user authentication, role-based access, product management, cart functionality, and order placement.

## Features

- **User Authentication**
  - JWT-based login and registration
  - Role-based access control (`customer`, `admin`)

- **Product Management**
  - Admins can add, update, delete products
  - Customers can view available products
  - Product search by name or category
  - Pagination support

- **Cart System**
  - Each customer has a personal cart
  - Add, update, and remove items
  - Quantity auto-increment if item exists

- **Order System**
  - Convert cart to an order
  - Store snapshot of product name, price, quantity at time of order
  - Auto-clear cart after order placement

- **Frontend Interface**
  - Simple HTML, CSS, and JS interface
  - Login form, product list, cart view, and order actions
  - Admin UI to manage products

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, CORS
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Deployment Targets**: 
  - Backend: Render or Railway
  - Frontend: Vercel
