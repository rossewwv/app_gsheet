<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>App GSheet</title>

  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="d-flex flex-column min-vh-100">

<nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand" href="index.php">App GSheet</a>

    <div class="d-flex gap-3">
      <a href="index.php" class="text-white">
        <i class="bi bi-house fs-5"></i>
      </a>
      <a href="cart.php" class="text-white position-relative">
        <i class="bi bi-cart fs-5"></i>
        <span id="cart-badge"
          class="position-absolute top-0 start-100 translate-middle
          badge rounded-pill bg-danger d-none">0</span>
      </a>
    </div>
  </div>
</nav>
