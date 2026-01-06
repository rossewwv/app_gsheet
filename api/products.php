<?php
header("Content-Type: application/json");

// =========================
// CONFIG
// =========================
$cacheDir  = __DIR__ . "/cache";
$cacheFile = $cacheDir . "/products.json";
$cacheTime = 60; // detik
$force     = isset($_GET['force']);

// =========================
// USE CACHE (jika tidak force)
// =========================
if (
    !$force &&
    file_exists($cacheFile) &&
    (time() - filemtime($cacheFile) < $cacheTime)
) {
    echo file_get_contents($cacheFile);
    exit;
}

// =========================
// FETCH FROM GOOGLE APPS SCRIPT
// =========================
$apiUrl = "https://script.google.com/macros/s/AKfycbx8rH0wBQQwBsAsReUGhZZNKh5FrFSGDTx3id8e9Ae5mAnOYJAqZSjnRjJnOrdaV-RV/exec";

$response = @file_get_contents($apiUrl);

if ($response === false) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Gagal mengambil data produk dari Google Sheet"
    ]);
    exit;
}

// =========================
// SAVE CACHE
// =========================
if (!file_exists($cacheDir)) {
    mkdir($cacheDir, 0777, true);
}
file_put_contents($cacheFile, $response);

// =========================
// OUTPUT
// =========================
echo $response;
