<?php include 'partials/header.php'; ?>

<main class="container my-5 pt-5 flex-grow-1">
  <h1 class="mb-4">Checkout</h1>

  <div class="row">
    <!-- FORM CUSTOMER -->
    <div class="col-md-6 mb-4">
      <h4>Data Pembeli</h4>

      <form id="checkout-form" onsubmit="submitOrder(event)">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input type="text" id="cust-name" class="form-control" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" id="cust-email" class="form-control" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Nomor HP</label>
          <input type="tel" id="cust-phone" class="form-control" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Alamat (Opsional)</label>
          <textarea id="cust-address" class="form-control" rows="3"></textarea>
        </div>
      </form>
    </div>

    <!-- RINGKASAN PESANAN + AGREEMENT -->
    <div class="col-md-6">
      <h4>Ringkasan Pesanan</h4>

      <div class="border rounded p-3">
        <div id="checkout-cart"></div>

        <hr>
        <div class="d-flex justify-content-between fw-bold mb-3">
          <span>Total</span>
          <span id="checkout-total"></span>
        </div>

        <!-- AGREEMENT -->
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="agree-terms" required form="checkout-form">
          <label class="form-check-label" for="agree-terms">
            I agree to the <a href="#" target="_blank">Terms of Use</a>
          </label>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="agree-marketing" form="checkout-form">
          <label class="form-check-label" for="agree-marketing">
            I agree that my email and phone number may be used to receive newsletters or marketing messages, which I can unsubscribe from at any time.
          </label>
        </div>

        <!-- SUBMIT BUTTON -->
        <button class="btn btn-success w-100" type="submit" form="checkout-form">
          Buat Pesanan
        </button>
      </div>
    </div>
  </div>
</main>

<?php
include 'partials/footer.php';
include 'partials/scripts.php';
?>
