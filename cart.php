<?php include 'partials/header.php'; ?>

<main class="container my-5 pt-5 flex-grow-1">
  <h1 class="mb-4">Keranjang Belanja</h1>

  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>Produk</th>
          <th>Harga</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="cart-table">
        <!-- Produk akan di-render oleh cart.js -->
      </tbody>
    </table>
  </div>

  <div class="text-end">
    <h4 id="cart-total"></h4>
    <a href="checkout.php" class="btn btn-success mt-2">Checkout</a>
  </div>
</main>

<?php
include 'partials/footer.php';
include 'partials/scripts.php';
?>
