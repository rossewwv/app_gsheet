<?php
header("Content-Type: application/json");

// Lokasi cache JSON di server
$cacheFile = __DIR__ . "/cache/products.json"; // pastikan folder api/cache ada
$cacheTime = 60; // cache 60 detik

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    // Pakai cache
    echo file_get_contents($cacheFile);
    exit;
}

// URL Google Apps Script
$apiUrl = "https://script.google.com/macros/s/AKfycbyAX58lxM3wyJuFBFC_0ob9zCO0DYgY7FQyZSoGwZDz04DeE7_hskpsiTZXiClvwfcy/exec";

// Fetch data dari GAS
$response = @file_get_contents($apiUrl);

if ($response === false) {
    echo json_encode([
        "error" => true,
        "message" => "Gagal mengambil data produk dari Google Sheet"
    ]);
    exit;
}

// Simpan ke cache
if (!file_exists(__DIR__ . "/cache")) {
    mkdir(__DIR__ . "/cache", 0777, true);
}
file_put_contents($cacheFile, $response);

// Kirim ke frontend
echo $response;
