// =========================
// STORAGE
// =========================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
// CART ACTION
// =========================
function addToCart(id) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  item ? item.qty++ : cart.push({ id, qty: 1 });

  saveCart(cart);
  updateCartBadge();
  alert("Produk ditambahkan ke keranjang");
}

function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  renderCartTable();
  updateCartBadge();
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty = parseInt(qty);
  saveCart(cart);
  renderCartTable();
  updateCartBadge();
}

// =========================
// BADGE
// =========================
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  const total = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.classList.toggle("d-none", total === 0);
}

// =========================
// CART PAGE (cart.php)
// =========================
function renderCartTable() {
  const tbody = document.getElementById("cart-table");
  const totalEl = document.getElementById("cart-total");
  if (!tbody || !totalEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Keranjang kosong</td>
      </tr>
    `;
    totalEl.textContent = "";
    return;
  }

  let grandTotal = 0;

  tbody.innerHTML = cart
    .map((i) => {
      const p = PRODUCTS.find((p) => p.id === i.id);
      const subtotal = p.price * i.qty;
      grandTotal += subtotal;

      return `
      <tr>
        <td>${p.name}</td>
        <td>Rp ${p.price.toLocaleString()}</td>
        <td>
          <input type="number" min="1"
            class="form-control"
            value="${i.qty}"
            onchange="updateQty('${i.id}', this.value)">
        </td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-danger"
            onclick="removeFromCart('${i.id}')">
            Hapus
          </button>
        </td>
      </tr>
    `;
    })
    .join("");

  totalEl.textContent = "Total: Rp " + grandTotal.toLocaleString();
}

// =========================
// CHECKOUT PAGE
// =========================
function renderCheckout() {
  const list = document.getElementById("checkout-cart");
  const totalEl = document.getElementById("checkout-total");
  if (!list || !totalEl) return;

  const cart = getCart();
  let total = 0;

  list.innerHTML = cart
    .map((i) => {
      const p = PRODUCTS.find((p) => p.id === i.id);
      if (!p) return "";

      const subtotal = p.price * i.qty;
      total += subtotal;

      return `
      <div class="d-flex align-items-center justify-content-between border-bottom py-2">
        <div class="d-flex align-items-center gap-3">
          <img src="${p.image}"
               alt="${p.name}"
               width="50"
               height="50"
               class="rounded object-fit-cover">
          <div>
            <div class="fw-semibold">${p.name}</div>
            <small class="text-muted">Qty: ${i.qty}</small>
          </div>
        </div>
        <div class="fw-semibold">
          Rp ${subtotal.toLocaleString()}
        </div>
      </div>
    `;
    })
    .join("");

  totalEl.textContent = "Rp " + total.toLocaleString();
}

// function renderCheckout() {
//   const list = document.getElementById("checkout-cart");
//   const totalEl = document.getElementById("checkout-total");
//   if (!list || !totalEl) return;

//   const cart = getCart();
//   let total = 0;

//   list.innerHTML = cart
//     .map((i) => {
//       const p = PRODUCTS.find((p) => p.id === i.id);
//       const subtotal = p.price * i.qty;
//       total += subtotal;

//       return `
//       <div class="d-flex justify-content-between border-bottom py-2">
//         <div>${p.name} (x${i.qty})</div>
//         <div>Rp ${subtotal.toLocaleString()}</div>
//       </div>
//     `;
//     })
//     .join("");

//   totalEl.textContent = "Rp " + total.toLocaleString();
// }

// INIT
renderCartTable();
renderCheckout();
updateCartBadge();

function submitOrder(e) {
  e.preventDefault();

  if (!document.getElementById("agree-terms").checked) {
    alert("Anda harus menyetujui Terms of Use");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  const order = {
    customer: {
      name: document.getElementById("cust-name").value,
      email: document.getElementById("cust-email").value,
      phone: document.getElementById("cust-phone").value,
      address: document.getElementById("cust-address").value || "-",
      marketingConsent: document.getElementById("agree-marketing").checked,
    },
    items: cart,
    date: new Date().toISOString(),
  };

  console.log("ORDER:", order);

  alert("Pesanan berhasil dibuat!");
  localStorage.removeItem("cart");
  updateCartBadge();
  location.href = "index.php";
}
