const API_URL = "https://ecomapi-3qti.onrender.com/api"; 

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const msg = document.getElementById("auth-msg");

  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const loginData = await loginRes.json();

    if (loginRes.ok) {
      handleLoginSuccess(loginData);
    } else {
      
      const registerRes = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const registerData = await registerRes.json();

      if (registerRes.ok) {
        const autoLoginRes = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const autoLoginData = await autoLoginRes.json();

        if (autoLoginRes.ok) {
          handleLoginSuccess(autoLoginData);
        } else {
          msg.textContent = "Auto-login failed.";
        }
      } else {
        msg.textContent = registerData.message || "Registration failed.";
      }
    }
  } catch (err) {
    msg.textContent = "Error: " + err.message;
  }
});

function handleLoginSuccess(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  document.getElementById("auth-section").style.display = "none";
  document.getElementById("main-section").style.display = "block";
  document.getElementById("user-role").textContent = data.role;

  if (data.role === "admin") {
    document.getElementById("admin-section").style.display = "block";
  }

  loadProducts();
  loadCart();
}

function logout() {
  localStorage.clear();
  location.reload();
}

async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();
  const list = document.getElementById("product-list");

  list.innerHTML = products.map(p => `
    <div>
      <strong>${p.name}</strong> (${p.category}) - $${p.price}
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    </div>
  `).join("");
}

async function addToCart(productId) {
  await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ productId })
  });
  loadCart();
}

async function loadCart() {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  const cart = await res.json();
  const list = document.getElementById("cart-list");

  if (!cart.items || cart.items.length === 0) {
    list.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  list.innerHTML = cart.items.map(item => `
    <div>
      ${item.product.name} - $${item.product.price} x ${item.quantity}
    </div>
  `).join("");
}

document.getElementById("place-order-btn").addEventListener("click", async () => {
  await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  alert("Order placed!");
  loadCart();
});

document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const category = document.getElementById("product-category").value;
  const price = parseFloat(document.getElementById("product-price").value);

  await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, category, price })
  });

  loadProducts();
  e.target.reset();
});
