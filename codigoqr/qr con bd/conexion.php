<?php
require ("credenciales.php");

$pdo = new PDO("mysql:host=$host;dbname=$dbname", "$user", "$password");
echo "conexion establecida";
?>