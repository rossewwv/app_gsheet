const PRODUCTS = [
  {
    id: "p1",
    name: "Kopi Arabika",
    price: 25000,
    image: "assets/img/placeholder.png",
  },
  {
    id: "p2",
    name: "Teh Herbal",
    price: 15000,
    image: "assets/img/placeholder.png",
  },
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  saveCart(cart);
  updateCartBadge();
  alert("Produk ditambahkan");
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.classList.toggle("d-none", total === 0);
}

function renderProducts() {
  const el = document.getElementById("product-list");
  if (!el) return;
  el.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${p.image}" class="card-img-top">
        <div class="card-body">
          <h5>${p.name}</h5>
          <p>Rp ${p.price.toLocaleString()}</p>
          <a href="detailproduct.php?id=${
            p.id
          }" class="btn btn-outline-primary w-100">
            Detail
          </a>
        </div>
      </div>
    </div>
  `
  ).join("");
}

function renderDetail() {
  const el = document.getElementById("product-detail");
  if (!el) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) return;

  el.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${p.image}" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>${p.name}</h2>
        <p>Rp ${p.price.toLocaleString()}</p>
        <button class="btn btn-primary" onclick="addToCart('${p.id}')">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  `;
}

function renderCart() {
  const el = document.getElementById("cart-list");
  if (!el) return;
  const cart = getCart();
  el.innerHTML = cart.length
    ? cart
        .map((i) => {
          const p = PRODUCTS.find((p) => p.id === i.id);
          return `<div>${p.name} x ${i.qty}</div>`;
        })
        .join("")
    : "<p>Keranjang kosong</p>";
}

renderProducts();
renderDetail();
renderCart();
updateCartBadge();
