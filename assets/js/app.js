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

  // 1️⃣ Tampilkan skeleton sementara
  el.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading produk...</p>
    </div>
  `;

  // 2️⃣ Cek localStorage
  const cached = localStorage.getItem("products");
  if (cached) {
    PRODUCTS = JSON.parse(cached);
    renderProducts();
    return;
  }

  try {
    const res = await fetch("api/products.php");
    const data = await res.json();

    if (data.error) {
      el.innerHTML = `<p class="text-danger text-center">${data.message}</p>`;
      return;
    }

    PRODUCTS = data;

    // Simpan ke localStorage agar reload cepat
    localStorage.setItem("products", JSON.stringify(data));

    renderProducts();
  } catch (err) {
    console.error("Gagal load produk", err);
    el.innerHTML = `<p class="text-danger text-center">Gagal load produk</p>`;
  }
}

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

  // 1️⃣ Skeleton loading
  el.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading produk...</p>
    </div>
  `;

  // 2️⃣ Ambil product ID dari URL
  const id = new URLSearchParams(location.search).get("id");

  // 3️⃣ Pastikan PRODUCTS sudah ada (localStorage / fetch)
  if (!PRODUCTS.length) {
    const cached = localStorage.getItem("products");
    if (cached) PRODUCTS = JSON.parse(cached);
  }

  // 4️⃣ Cari produk
  const p = PRODUCTS.find((prod) => prod.id === id);

  if (!p) {
    el.innerHTML = `<p class="text-center text-danger">Produk tidak ditemukan</p>`;
    return;
  }

  // 5️⃣ Render detail
  el.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${p.image}" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>${p.name}</h2>
        <p class="fs-5 fw-bold">Rp ${p.price.toLocaleString()}</p>
        <button class="btn btn-primary mt-3" onclick="addToCart('${p.id}')">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  `;
}

renderProducts();
renderDetail();
loadProducts();

document.addEventListener("DOMContentLoaded", () => {
  loadProducts(); // load dari PHP proxy / localStorage
  renderDetail(); // render detail page jika ada
});
