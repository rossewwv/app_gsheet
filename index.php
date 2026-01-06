<?php include 'partials/header.php'; ?>

<main class="container my-5 pt-5 flex-grow-1">
    <!-- <button
    class="btn btn-outline-secondary btn-sm"
    onclick="forceRefreshProducts()">
    🔄 Refresh Produk
  </button> -->


  <h1 class="text-center mb-4">Welcome</h1>
  
  <div class="row" id="product-list">
    <!-- Produk akan muncul di sini -->
  </div>

  <!-- Template Produk -->
  <template id="template-product-card">
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img class="card-img-top" src="" alt="">
        <div class="card-body d-flex flex-column">
          <h5 class="product-name"></h5>
          <p class="product-price"></p>
          <a href="#" class="btn btn-outline-primary mt-auto detail-btn">Detail</a>
        </div>
      </div>
    </div>
  </template>

</main>

<?php
include 'partials/footer.php';
include 'partials/scripts.php';
?>
