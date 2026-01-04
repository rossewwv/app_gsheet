// =========================
// STORAGE
// =========================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); // update badge di header
}
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); // update badge di header
}

// Render cart table
function renderCart() {
  const el = document.getElementById("cart-table");
  if (!el) return;

  const cart = getCart();

  if (!cart.length) {
    el.innerHTML = `<tr><td colspan="5" class="text-center">Keranjang kosong</td></tr>`;
    document.getElementById("cart-total").textContent = "";
    return;
  }

  let total = 0;

  el.innerHTML = cart
    .map((item) => {
      // Cari data produk lengkap dari PRODUCTS
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return "";

      const subtotal = p.price * item.qty;
      total += subtotal;

      return `
      <tr>
        <td>
          <img src="${p.image}" alt="${
        p.name
      }" style="width:50px; height:50px; object-fit:cover;" class="me-2">
          ${p.name}
        </td>
        <td>Rp ${p.price.toLocaleString()}</td>
        <td>
          <input type="number" class="form-control qty-input" value="${
            item.qty
          }" min="1" data-id="${p.id}">
        </td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-item" data-id="${
            p.id
          }">Hapus</button>
        </td>
      </tr>
    `;
    })
    .join("");

  document.getElementById("cart-total").textContent =
    "Total: Rp " + total.toLocaleString();

  // Attach event listener untuk qty change
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      let qty = parseInt(e.target.value);
      if (isNaN(qty) || qty < 1) qty = 1;

      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (item) item.qty = qty;
      saveCart(cart);
      renderCart(); // re-render supaya subtotal & total update
    });
  });

  // Attach event listener untuk remove
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      let cart = getCart();
      cart = cart.filter((i) => i.id !== id);
      saveCart(cart);
      renderCart();
    });
  });
}

// Inisialisasi ketika halaman load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const el = document.getElementById("cart-table");
  if (!el) return;

  // Ambil PRODUCTS dari localStorage kalau belum ada
  if (!PRODUCTS.length) {
    const cached = localStorage.getItem("products");
    if (cached) PRODUCTS = JSON.parse(cached);
  }

  const cart = getCart();
  if (!cart.length) {
    el.innerHTML = `<tr><td colspan="5" class="text-center">Keranjang kosong</td></tr>`;
    document.getElementById("cart-total").textContent = "";
    return;
  }

  let total = 0;

  el.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return ""; // jika produk tidak ditemukan di PRODUCTS

      const subtotal = p.price * item.qty;
      total += subtotal;

      return `
      <tr>
        <td>
          <img src="${p.image}" alt="${
        p.name
      }" style="width:20px; height:20px; object-fit:cover;" class="me-2">
          ${p.name}
        </td>
        <td>Rp ${p.price.toLocaleString()}</td>
        <td>
          <input type="number" class="form-control qty-input" value="${
            item.qty
          }" min="1" data-id="${p.id}">
        </td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-item" data-id="${
            p.id
          }">Hapus</button>
        </td>
      </tr>
    `;
    })
    .join("");

  document.getElementById("cart-total").textContent =
    "Total: Rp " + total.toLocaleString();

  // event listener qty & remove sama seperti sebelumnya
}

// Render cart table
// function renderCart() {
//   const el = document.getElementById("cart-table");
//   if (!el) return;

//   const cart = getCart();

//   if (!cart.length) {
//     el.innerHTML = `<tr><td colspan="5" class="text-center">Keranjang kosong</td></tr>`;
//     document.getElementById("cart-total").textContent = "";
//     return;
//   }

//   let total = 0;

//   el.innerHTML = cart
//     .map((item) => {
//       // Cari data produk lengkap dari PRODUCTS
//       const p = PRODUCTS.find((prod) => prod.id === item.id);
//       if (!p) return "";

//       const subtotal = p.price * item.qty;
//       total += subtotal;

//       return `
//       <tr>
//         <td>
//           <img src="${p.image}" alt="${
//         p.name
//       }" style="width:50px; height:50px; object-fit:cover;" class="me-2">
//           ${p.name}
//         </td>
//         <td>Rp ${p.price.toLocaleString()}</td>
//         <td>
//           <input type="number" class="form-control qty-input" value="${
//             item.qty
//           }" min="1" data-id="${p.id}">
//         </td>
//         <td>Rp ${subtotal.toLocaleString()}</td>
//         <td>
//           <button class="btn btn-danger btn-sm remove-item" data-id="${
//             p.id
//           }">Hapus</button>
//         </td>
//       </tr>
//     `;
//     })
//     .join("");

//   document.getElementById("cart-total").textContent =
//     "Total: Rp " + total.toLocaleString();

//   // Attach event listener untuk qty change
//   document.querySelectorAll(".qty-input").forEach((input) => {
//     input.addEventListener("change", (e) => {
//       const id = e.target.dataset.id;
//       let qty = parseInt(e.target.value);
//       if (isNaN(qty) || qty < 1) qty = 1;

//       const cart = getCart();
//       const item = cart.find((i) => i.id === id);
//       if (item) item.qty = qty;
//       saveCart(cart);
//       renderCart(); // re-render supaya subtotal & total update
//     });
//   });

//   // Attach event listener untuk remove
//   document.querySelectorAll(".remove-item").forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const id = e.target.dataset.id;
//       let cart = getCart();
//       cart = cart.filter((i) => i.id !== id);
//       saveCart(cart);
//       renderCart();
//     });
//   });
// }

// // Inisialisasi ketika halaman load
// document.addEventListener("DOMContentLoaded", () => {
//   renderCart();
// });

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

      // jika produk tidak ditemukan, skip
      if (!p) return "";

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

// Submit order
function submitOrder(e) {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    alert("Keranjang kosong!");
    return;
  }

  const order = {
    customer: {
      name: document.getElementById("cust-name").value,
      email: document.getElementById("cust-email").value,
      phone: document.getElementById("cust-phone").value,
      address: document.getElementById("cust-address").value || "",
    },
    cart: cart,
    date: new Date().toISOString(),
  };

  console.log("ORDER:", order);

  // TODO: Kirim ke Google Sheet via Apps Script / API
  alert("Pesanan berhasil dikirim!");

  localStorage.removeItem("cart");
  updateCartBadge();
  location.href = "index.php";
}

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
});

// Submit order
function submitOrder(e) {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    alert("Keranjang kosong!");
    return;
  }

  const order = {
    customer: {
      name: document.getElementById("cust-name").value,
      email: document.getElementById("cust-email").value,
      phone: document.getElementById("cust-phone").value,
      address: document.getElementById("cust-address").value || "",
    },
    cart: cart,
    date: new Date().toISOString(),
  };

  console.log("ORDER:", order);

  // TODO: Kirim ke Google Sheet via Apps Script / API
  alert("Pesanan berhasil dikirim!");

  localStorage.removeItem("cart");
  updateCartBadge();
  location.href = "index.php";
}

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

  // Skeleton sementara jika PRODUCTS belum ada
  if (!PRODUCTS.length) {
    list.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p>Loading produk...</p>
      </div>
    `;
    return;
  }

  let total = 0;

  list.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);

      // skip item kalau produk tidak ditemukan
      if (!p) return "";

      const subtotal = p.price * item.qty;
      total += subtotal;

      return `
        <div class="d-flex align-items-center mb-2">
          <img src="${p.image}" alt="${
        p.name
      }" style="width:50px;height:50px;object-fit:cover;" class="me-2 rounded">
          <div class="flex-grow-1">${p.name} (x${item.qty})</div>
          <div>Rp ${subtotal.toLocaleString()}</div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = "Rp " + total.toLocaleString();
}

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
});

// function renderCheckout() {
//   const list = document.getElementById("checkout-cart");
//   const totalEl = document.getElementById("checkout-total");
//   if (!list || !totalEl) return;

//   const cart = getCart();
//   let total = 0;

//   list.innerHTML = cart
//     .map((i) => {
//       const p = PRODUCTS.find((p) => p.id === i.id);
//       if (!p) return "";

//       const subtotal = p.price * i.qty;
//       total += subtotal;

//       return `
//       <div class="d-flex align-items-center justify-content-between border-bottom py-2">
//         <div class="d-flex align-items-center gap-3">
//           <img src="${p.image}"
//                alt="${p.name}"
//                width="50"
//                height="50"
//                class="rounded object-fit-cover">
//           <div>
//             <div class="fw-semibold">${p.name}</div>
//             <small class="text-muted">Qty: ${i.qty}</small>
//           </div>
//         </div>
//         <div class="fw-semibold">
//           Rp ${subtotal.toLocaleString()}
//         </div>
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

// function submitOrder(e) {
//   e.preventDefault();

//   if (!document.getElementById("agree-terms").checked) {
//     alert("Anda harus menyetujui Terms of Use");
//     return;
//   }

//   const cart = getCart();
//   if (cart.length === 0) {
//     alert("Keranjang kosong");
//     return;
//   }

//   const order = {
//     customer: {
//       name: document.getElementById("cust-name").value,
//       email: document.getElementById("cust-email").value,
//       phone: document.getElementById("cust-phone").value,
//       address: document.getElementById("cust-address").value || "-",
//       marketingConsent: document.getElementById("agree-marketing").checked,
//     },
//     items: cart,
//     date: new Date().toISOString(),
//   };

//   console.log("ORDER:", order);

//   alert("Pesanan berhasil dibuat!");
//   localStorage.removeItem("cart");
//   updateCartBadge();
//   location.href = "index.php";
// }
