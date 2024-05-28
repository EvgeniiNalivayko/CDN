<?php
$apiKey = '26e9e793890e9c8e116f9bf994116b66'; // Замените на ваш ключ API
$url = 'http://chezup.pro/admin_api/v1/domains'; // Замените на ваш URL API Keitaro

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Key: ' . $apiKey));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    // Убедитесь, что возвращаемый ответ имеет корректный Content-Type
    header('Content-Type: application/json');
    echo $response;
}

curl_close($ch);
?>
