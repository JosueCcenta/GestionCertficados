<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prueba";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$dni = $_GET['dni'];
echo $dni;
try{
    $sql = "SELECT nombre, apellido, curso FROM clientes WHERE dni = $dni";
    $result = $conn->query($sql);
    if (!$result) {
        die("Error en la consulta: " . $conn->error);
    }
    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $nombre = $row["nombre"];
        $apellido = $row["apellido"];
        $curso = $row["curso"];

        echo "<h1>Perfil de $nombre $apellido</h1>";
        echo "<p><strong>Nombre:</strong> $nombre</p>";
        echo "<p><strong>Apellido:</strong> $apellido</p>";
        echo "<p><strong>Edad:</strong> $curso</p>";
    } else {
        echo "No se encontró la persona.";
    }
}catch(EXCEPTION $e){
    echo "Ha habido un error -> $e";
}finally{
    $conn->close();
}

?>