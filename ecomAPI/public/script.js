const API_URL = "https://ecomapi-3qti.onrender.com/api";

// DOM Elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authSection = document.getElementById("auth-section");
const mainSection = document.getElementById("main-section");
const adminSection = document.getElementById("admin-section");
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Toggle between login and register forms
document.getElementById("show-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  document.getElementById("auth-msg").textContent = "";
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("register-msg").textContent = "";
});

// Login Handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const msg = document.getElementById("auth-msg");

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      handleLoginSuccess(data);
    } else {
      msg.textContent = data.message || "Login failed. Please check your credentials.";
    }
  } catch (err) {
    msg.textContent = "Network error. Please try again later.";
    console.error("Login error:", err);
  }
});

// Registration Handler
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;
  const msg = document.getElementById("register-msg");

  // Client-side validation
  if (password !== confirmPassword) {
    msg.textContent = "Passwords don't match!";
    return;
  }

  if (password.length < 6) {
    msg.textContent = "Password must be at least 6 characters";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      msg.textContent = "Registration successful! Please login.";
      // Switch back to login form
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      // Pre-fill the username
      document.getElementById("login-username").value = username;
      document.getElementById("register-msg").textContent = "";
    } else {
      msg.textContent = data.message || "Registration failed. Username may be taken.";
    }
  } catch (err) {
    msg.textContent = "Network error. Please try again later.";
    console.error("Registration error:", err);
  }
});

// Handle successful login
function handleLoginSuccess(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("email", data.email);
  localStorage.setItem("username", data.name);

  authSection.style.display = "none";
  mainSection.style.display = "block";
  document.getElementById("user-role").textContent = data.username;

  if (data.role === "admin") {
    adminSection.style.display = "block";
  } else {
    adminSection.style.display = "none";
  }

  loadProducts();
  loadCart();
}

// Logout function
function logout() {
  localStorage.clear();
  location.reload();
}

// Product Management
async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    
    productList.innerHTML = products.map(p => `
      <div class="product-item">
        <strong>${p.name}</strong> (${p.category}) - $${p.price}
        <button onclick="addToCart('${p._id}')">Add to Cart</button>
      </div>
    `).join("");
  } catch (err) {
    console.error("Failed to load products:", err);
    productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

// Cart Management
async function addToCart(productId) {
  try {
    await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ productId })
    });
    loadCart();
  } catch (err) {
    console.error("Failed to add to cart:", err);
    alert("Failed to add item to cart");
  }
}

async function loadCart() {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    const cart = await res.json();

    if (!cart.items || cart.items.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    cartList.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        ${item.product.name} - $${item.product.price} x ${item.quantity}
        <button onclick="removeFromCart('${item._id}')">Remove</button>
      </div>
    `).join("");

    // Show/hide place order button based on cart contents
    document.getElementById("place-order-btn").style.display = 
      cart.items.length > 0 ? "block" : "none";
  } catch (err) {
    console.error("Failed to load cart:", err);
    cartList.innerHTML = "<p>Failed to load cart. Please try again later.</p>";
  }
}

// Order Placement
document.getElementById("place-order-btn").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });

    if (response.ok) {
      alert("Order placed successfully!");
      loadCart();
    } else {
      const error = await response.json();
      alert(`Failed to place order: ${error.message}`);
    }
  } catch (err) {
    console.error("Order placement error:", err);
    alert("Failed to place order. Please try again later.");
  }
});

// Admin Product Management
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("product-name").value;
  const category = document.getElementById("product-category").value;
  const price = parseFloat(document.getElementById("product-price").value);

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name, category, price })
    });

    if (response.ok) {
      loadProducts();
      e.target.reset();
    } else {
      const error = await response.json();
      alert(`Failed to add product: ${error.message}`);
    }
  } catch (err) {
    console.error("Product addition error:", err);
    alert("Failed to add product. Please try again later.");
  }
});

// Check if user is already logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    authSection.style.display = "none";
    mainSection.style.display = "block";
    document.getElementById("user-role").textContent = localStorage.getItem("username");
    
    if (localStorage.getItem("role") === "admin") {
      adminSection.style.display = "block";
    }
    
    loadProducts();
    loadCart();
  }
});