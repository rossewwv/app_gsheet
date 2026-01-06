<!-- BOOTSTRAP JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- CONFIG -->
<script src="assets/js/config.js"></script>

<!-- API -->
<!-- <script defer src="assets/js/api.js"></script> -->

<!-- BOOTSTRAP JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- APP LOGIC -->
<!-- <script src="assets/js/product.js"></script>
<script src="assets/js/cart.js"></script>
<script src="assets/js/checkout.js"></script>
<script src="assets/js/button.js"></script> -->


<?php if (basename($_SERVER['PHP_SELF']) === 'index.php'): ?>
  <script src="assets/js/product.js"></script>
<?php endif; ?>

<?php if (basename($_SERVER['PHP_SELF']) === 'detailproduct.php'): ?>
  <script src="assets/js/product.js"></script>
<?php endif; ?>

<?php if (basename($_SERVER['PHP_SELF']) === 'cart.php'): ?>
  <script src="assets/js/cart.js"></script>
<?php endif; ?>

<?php if (basename($_SERVER['PHP_SELF']) === 'checkout.php'): ?>
  <script src="assets/js/checkout.js"></script>
<?php endif; ?>
