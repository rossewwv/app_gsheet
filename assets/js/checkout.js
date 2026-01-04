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

  // Jika PRODUCTS belum ada, ambil dari localStorage
  if (!PRODUCTS.length) {
    const cached = localStorage.getItem("products");
    if (cached) PRODUCTS = JSON.parse(cached);
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

  // Validasi terms
  if (!document.getElementById("agree-terms").checked) {
    alert("Anda harus menyetujui Terms of Use");
    return;
  }

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
      address: document.getElementById("cust-address").value || "-",
      marketingConsent: document.getElementById("agree-marketing").checked,
    },
    items: cart,
    date: new Date().toISOString(),
  };

  console.log("ORDER:", order);

  // TODO: Kirim ke Google Sheet / API
  alert("Pesanan berhasil dibuat!");

  // Bersihkan cart
  localStorage.removeItem("cart");
  updateCartBadge();

  // Redirect ke halaman utama
  location.href = "index.php";
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
});
