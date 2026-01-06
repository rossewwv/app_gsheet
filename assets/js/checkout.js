// =========================
// CHECKOUT PAGE
// =========================
// Render ringkasan cart
function renderCheckout() {
  const list = document.getElementById("checkout-cart");
  const totalEl = document.getElementById("checkout-total");
  if (!list || !totalEl) return;

  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<p class="text-center">Keranjang kosong</p>`;
    totalEl.textContent = "";
    return;
  }

  if (!Array.isArray(PRODUCTS) || !PRODUCTS.length) {
    list.innerHTML = `<p class="text-danger">Produk belum dimuat</p>`;
    return;
  }

  let total = 0;

  list.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return "";

      const subtotal = p.price * item.qty;
      total += subtotal;

      return `
        <div class="d-flex align-items-center mb-2">
          <img src="${p.image}" alt="${
        p.name
      }" class="rounded me-2" style="width:50px;height:50px;object-fit:cover;">
          <div class="flex-grow-1">${p.name} (x${item.qty})</div>
          <div>Rp ${subtotal.toLocaleString()}</div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = "Rp " + total.toLocaleString();
}

// Submit order
function submitOrder(e) {
  e.preventDefault();

  const nameEl = document.getElementById("cust-name");
  const emailEl = document.getElementById("cust-email");
  const phoneEl = document.getElementById("cust-phone");

  if (!nameEl || !emailEl || !phoneEl) {
    console.warn("Checkout form not found");
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    alert("Cart is empty");
    return;
  }

  const payload = {
    name: nameEl.value,
    email: emailEl.value,
    phone: phoneEl.value,
    marketing: document.getElementById("agree-marketing")?.checked || false,
    created_at: new Date().toISOString(),
  };

  console.log("ORDER:", payload);
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
});
