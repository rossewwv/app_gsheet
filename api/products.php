<?php
header("Content-Type: application/json");

$apiUrl = "https://script.google.com/macros/s/AKfycbyAX58lxM3wyJuFBFC_0ob9zCO0DYgY7FQyZSoGwZDz04DeE7_hskpsiTZXiClvwfcy/exec";

$response = file_get_contents($apiUrl);

if ($response === false) {
  echo json_encode([
    "error" => true,
    "message" => "Gagal mengambil data produk"
  ]);
  exit;
}

echo $response;
