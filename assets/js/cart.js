// =========================
// STORAGE
// =========================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// =========================
// BADGE HEADER
// =========================
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
  badge.classList.toggle("d-none", total === 0);
}

// =========================
// CART ACTIONS
// =========================
function addToCart(id) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  saveCart(cart);
  renderCartTable();
}

function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  renderCartTable();
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = parseInt(qty) || 1;
  saveCart(cart);
  renderCartTable();
}

// =========================
// RENDER CART TABLE
// =========================
function renderCartTable() {
  const tbody = document.getElementById("cart-table");
  const totalEl = document.getElementById("cart-total");
  if (!tbody || !totalEl) return;

  // Ambil PRODUCTS dari localStorage jika belum ada
  if (!PRODUCTS.length) {
    const cached = localStorage.getItem("products");
    if (cached) PRODUCTS = JSON.parse(cached);
  }

  const cart = getCart();
  if (!cart.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">Keranjang kosong</td></tr>`;
    totalEl.textContent = "";
    return;
  }

  let grandTotal = 0;

  tbody.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return "";

      const subtotal = p.price * item.qty;
      grandTotal += subtotal;

      return `
        <tr>
          <td>
            <img src="${p.image}" alt="${
        p.name
      }" style="width:50px;height:50px;object-fit:cover;" class="me-2">
            ${p.name}
          </td>
          <td>Rp ${p.price.toLocaleString()}</td>
          <td>
            <input type="number" min="1" class="form-control qty-input" value="${
              item.qty
            }" data-id="${item.id}">
          </td>
          <td>Rp ${subtotal.toLocaleString()}</td>
          <td>
            <button class="btn btn-sm btn-danger remove-item" data-id="${
              item.id
            }">Hapus</button>
          </td>
        </tr>
      `;
    })
    .join("");

  totalEl.textContent = "Total: Rp " + grandTotal.toLocaleString();

  // Event listeners
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      updateQty(e.target.dataset.id, e.target.value);
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderCartTable();
  updateCartBadge();
});
