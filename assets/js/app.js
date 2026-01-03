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

// =========================
// RENDER HOME (INDEX)
// =========================
function renderProducts() {
  const el = document.getElementById("product-list");
  if (!el) return;

  el.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${p.image}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p>Rp ${p.price.toLocaleString()}</p>
          <a href="detailproduct.php?id=${p.id}" 
             class="btn btn-outline-primary mt-auto">
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
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) return;

  el.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${p.image}" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>${p.name}</h2>
        <p class="fs-4">Rp ${p.price.toLocaleString()}</p>
        <button class="btn btn-primary"
          onclick="addToCart('${p.id}')">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  `;
}

renderProducts();
renderDetail();
