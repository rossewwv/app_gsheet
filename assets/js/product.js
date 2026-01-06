// const PRODUCTS = [
//   {
//     id: "p1",
//     name: "Kopi Arabika",
//     price: 25000,
//     image: "assets/img/placeholder.png",
//   },
//   {
//     id: "p2",
//     name: "Teh Herbal",
//     price: 15000,
//     image: "assets/img/placeholder.png",
//   },
// ];

let PRODUCTS = [];

async function loadProducts() {
  const el = document.getElementById("product-list");
  if (!el) return;

  // skeleton
  el.innerHTML = `<div class="col-12 text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p>Loading produk...</p>
  </div>`;

  // ambil cached
  const cached = localStorage.getItem("products");
  if (cached) {
    PRODUCTS = JSON.parse(cached);
    renderProducts();
    return;
  }

  try {
    const res = await fetch("api/products.php");
    const data = await res.json();
    if (data.error) throw new Error(data.message);

    PRODUCTS = data;
    localStorage.setItem("products", JSON.stringify(data));
    renderProducts();
  } catch (err) {
    console.error(err);
    el.innerHTML = `<p class="text-danger text-center">Gagal load produk</p>`;
  }
}

// =========================
// RENDER HOME (index.php)
// =========================
function renderProducts() {
  const el = document.getElementById("product-list");
  if (!el) return; // ⬅️ PENTING

  el.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${p.image}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p>Rp ${p.price.toLocaleString()}</p>
          <a href="detailproduct.php?id=${
            p.id
          }" class="btn btn-outline-primary mt-auto">
            Detail
          </a>
        </div>
      </div>
    </div>
  `
  ).join("");
}

// =========================
// RENDER DETAIL PRODUK
// =========================
function renderDetail() {
  const el = document.getElementById("product-detail");
  if (!el) return;

  const id = new URLSearchParams(location.search).get("id");
  if (!PRODUCTS.length) {
    const cached = localStorage.getItem("products");
    if (cached) PRODUCTS = JSON.parse(cached);
  }

  const p = PRODUCTS.find((prod) => prod.id === id);
  if (!p) {
    el.innerHTML = `<p class="text-center text-danger">Produk tidak ditemukan</p>`;
    return;
  }

  const template = document.getElementById("template-product-detail");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".product-image").src = p.image;
  clone.querySelector(".product-image").alt = p.name;
  clone.querySelector(".product-name").textContent = p.name;
  clone.querySelector(".product-price").textContent =
    "Rp " + p.price.toLocaleString();
  clone.querySelector(".add-cart-btn").onclick = () => addToCart(p.id);

  el.innerHTML = ""; // clear skeleton
  el.appendChild(clone);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("product-list")) {
    loadProducts();
  }
});
