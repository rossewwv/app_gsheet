<?php include 'partials/header.php'; ?>

<main class="container my-5 pt-5 flex-grow-1">
  <div id="product-detail" class="row">
    <!-- Skeleton / Template akan muncul di JS -->
  </div>

  <!-- Template detail produk -->
  <template id="template-product-detail">
    <div class="col-md-6">
      <img class="img-fluid product-image rounded" src="" alt="">
    </div>
    <div class="col-md-6">
      <h2 class="product-name"></h2>
      <p class="fs-5 fw-bold product-price"></p>
      <button class="btn btn-primary mt-3 add-cart-btn">Tambah ke Keranjang</button>
    </div>
  </template>

</main>

<?php
include 'partials/footer.php';
include 'partials/scripts.php';
?>
