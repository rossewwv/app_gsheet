const PRODUCTS_TTL = 60 * 1000; // 60 detik

async function forceRefreshProducts() {
  console.log("FORCE REFRESH PRODUCTS");

  // 1️⃣ Hapus cache localStorage khusus products
  localStorage.removeItem("products_cache");

  // 2️⃣ Tampilkan loading
  const el = document.getElementById("product-list");
  if (el) {
    el.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p>Memuat ulang produk...</p>
      </div>
    `;
  }

  // 3️⃣ Fetch ulang + bypass browser cache
  try {
    const res = await fetch("api/products.php?force=1&ts=" + Date.now());

    const data = await res.json();

    if (data.error) {
      alert(data.message || "Gagal refresh produk");
      return;
    }

    // 4️⃣ Update PRODUCTS
    PRODUCTS = data;

    // 5️⃣ Simpan cache baru
    localStorage.setItem(
      "products_cache",
      JSON.stringify({
        data,
        fetchedAt: Date.now(),
      })
    );

    // 6️⃣ Render ulang
    renderProducts();
    renderDetail?.();
    renderCart?.();
    renderCheckout?.();

    console.log("REFRESH SUCCESS");
  } catch (err) {
    console.error("Force refresh gagal", err);
  }
}
