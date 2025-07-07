const API_URL = "https://ecomapi-3qti.onrender.com/api";
let token = "";
let role = "";
let userId = "";

const loginForm = document.getElementById("loginForm");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");

const authSection = document.getElementById("auth-section");
const productsSection = document.getElementById("products-section");
const cartSection = document.getElementById("cart-section");
const adminSection = document.getElementById("admin-section");

const adminForm = document.getElementById("adminForm");
const prodName = document.getElementById("prodName");
const prodCat = document.getElementById("prodCat");
const prodPrice = document.getElementById("prodPrice");

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailEl.value.trim();
  const password = passwordEl.value;

  if (!email || !password) return alert("Fill all fields");

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    token = data.token;
    role = data.user.role;
    userId = data.user.id;
    alert("✅ Login successful");
    authSection.classList.add("hidden");
    productsSection.classList.remove("hidden");
    cartSection.classList.remove("hidden");
    if (role === "admin") adminSection.classList.remove("hidden");
    fetchProducts();
    fetchCart();
  } else {
    alert("❌ Login failed");
  }
});

// Fetch Products
async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();
  productList.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.name} – ₹${p.price}
      <button onclick="addToCart('${p._id}')">Add</button>
    `;
    productList.appendChild(li);
  });
}

// Add to Cart
async function addToCart(productId) {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ productId, quantity: 1 })
  });
  if (res.ok) {
    alert("✅ Added to cart");
    fetchCart();
  } else {
    alert("❌ Failed to add");
  }
}

// Fetch Cart
async function fetchCart() {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const cart = await res.json();
  cartList.innerHTML = "";

  cart.items?.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.product.name} x ${item.quantity}`;
    cartList.appendChild(li);
  });
}

// Place Order
async function placeOrder() {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    alert("✅ Order placed!");
    fetchCart();
  } else {
    alert("❌ Failed to order");
  }
}

// Admin: Add Product
adminForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    name: prodName.value,
    category: prodCat.value,
    price: parseFloat(prodPrice.value)
  };

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert("✅ Product added");
    adminForm.reset();
    fetchProducts();
  } else {
    alert("❌ Failed to add");
  }
});
