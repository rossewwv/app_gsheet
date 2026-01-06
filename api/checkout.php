<?php
header("Content-Type: application/json");

$GAS_URL = "https://script.google.com/macros/s/AKfycbx8rH0wBQQwBsAsReUGhZZNKh5FrFSGDTx3id8e9Ae5mAnOYJAqZSjnRjJnOrdaV-RV/exec";

$input = file_get_contents("php://input");
if (!$input) {
  echo json_encode(["success" => false, "message" => "No data"]);
  exit;
}

$ch = curl_init($GAS_URL);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
  CURLOPT_POSTFIELDS => $input,
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
