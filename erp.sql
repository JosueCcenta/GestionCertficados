-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 06:24:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `erp`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE  PROCEDURE `createAlumno` (IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_email` VARCHAR(255), IN `dp_dni` INT(20), IN `dp_contrasena` VARCHAR(20), IN `dp_tipo_usuario` INT(11))   BEGIN
    INSERT INTO alumnos (nombres, apellido_p, apellido_m, email, dni,contrasena,id_tipo_usuario)
    VALUES (dp_nombre, dp_apellido_p, dp_apellido_m, dp_email,dp_dni,dp_contrasena,dp_tipo_usuario);
END$$

CREATE  PROCEDURE `createCertificado` (IN `dp_id_alumno` INT, IN `dp_id_seminario` INT)   BEGIN
INSERT INTO certificado(certificado.id_alumno,certificado.id_seminario) VALUES (dp_id_alumno,dp_id_seminario) ;
END$$

CREATE  PROCEDURE `createContenidoSeminario` (IN `dp_contenido` VARCHAR(3000))   BEGIN
INSERT INTO contenido_seminario(descripcion) VALUES(dp_contenido);
END$$

CREATE  PROCEDURE `createInstructor` (IN `dp_nombre` VARCHAR(200), IN `dp_apellidop` VARCHAR(200), IN `dp_apellidom` VARCHAR(200))   BEGIN
INSERT INTO instructor(instructor.nombre,instructor.apellido_p,instructor.apellido_m) VALUES(dp_nombre,dp_apellidop,dp_apellidom);
END$$

CREATE  PROCEDURE `createSeminario` (IN `dp_nombre_seminario` VARCHAR(255), IN `dp_fecha_inicio` DATE, IN `dp_fecha_termino` DATE, IN `dp_horas_totales` INT, IN `dp_id_instructor` INT, IN `dp_id_contenido_seminario` INT)   BEGIN
    INSERT INTO seminario (seminario.nombre, seminario.fecha_inicio, seminario.fecha_termino, seminario.hora_total, seminario.id_instructor,seminario.id_contenido)
    VALUES (dp_nombre_seminario, dp_fecha_inicio, dp_fecha_termino, dp_horas_totales, dp_id_instructor,dp_id_contenido_seminario);
END$$

CREATE  PROCEDURE `createTipo_usuario` (IN `p_nombre` VARCHAR(255))   BEGIN
    INSERT INTO tipo_cliente (nombre)
    VALUES (p_nombre);
END$$

CREATE  PROCEDURE `createUsuario` (IN `p_nombre` VARCHAR(255), IN `p_apellidos` VARCHAR(255), IN `p_contraseña` VARCHAR(255), IN `p_id_tipo_usuario` INT)   BEGIN
    INSERT INTO usuarios (nombre, apellidos, contraseña, id_tipo_usuario)
    VALUES (p_nombre, p_apellidos, p_contraseña, p_id_tipo_usuario);
END$$

CREATE  PROCEDURE `deleteAlumno` (IN `dp_id_alumno` INT)   BEGIN
DELETE FROM alumnos WHERE alumnos.id_alumno = dp_id_alumno;
END$$

CREATE  PROCEDURE `deleteContenido` (IN `dp_id_contenido` INT)   BEGIN
DELETE FROM contenido_seminario WHERE contenido_seminario.id_contenido = dp_id_contenido;
END$$

CREATE  PROCEDURE `deleteInstructor` (IN `dp_id_instructor` INT)   BEGIN
DELETE FROM instructor WHERE instructor.id_instructor = dp_id_instructor;
END$$

CREATE  PROCEDURE `deleteSeminario` (IN `dp_id_seminario` INT)   BEGIN
    DELETE FROM seminario WHERE id_seminario = dp_id_seminario;
END$$

CREATE  PROCEDURE `deleteTipo_usuario` (IN `p_id_tipo_usuario` INT)   BEGIN
    DELETE FROM tipo_cliente
    WHERE id_tipo_usuario = p_id_tipo_usuario;
END$$

CREATE  PROCEDURE `deleteUsuario` (IN `p_id_usuario` INT)   BEGIN
    DELETE FROM usuarios
    WHERE id_usuario = p_id_usuario;
END$$

CREATE  PROCEDURE `getAlumnoById` (IN `dp_id_alumno` INT)   BEGIN
    SELECT * FROM alumnos WHERE id_alumno = dp_id_alumno;
END$$

CREATE  PROCEDURE `getAlumnos` ()   BEGIN
	SELECT * FROM alumnos;
END$$

CREATE  PROCEDURE `getAlumnosFilter20` (IN `filtro` INT)   BEGIN
    DECLARE limite INT;
    DECLARE minimo INT;
    SET limite = filtro * 10;
    SET minimo = limite - 10;
    SELECT * FROM alumnos LIMIT minimo, limite;
END$$

CREATE  PROCEDURE `getCertificadobyId` (IN `id_certificado` INT)   BEGIN
    SELECT
        alumnos.*,
        certificado.*,
        seminario_detalle.*
    FROM 
        certificado
    INNER JOIN    
        (SELECT
            seminario.id_seminario,
            seminario.nombre AS nombre_seminario,
            instructor.id_instructor AS id_instructor_seminario,
            instructor.nombre AS nombre_instructor,
            instructor.apellido_p AS apellido_p_instructor,
            instructor.apellido_m AS apellido_m_instructor,
            contenido_seminario.id_contenido,
            contenido_seminario.descripcion AS descripcion_contenido
        FROM 
            seminario
        INNER JOIN    
            instructor ON seminario.id_instructor = instructor.id_instructor
        INNER JOIN    
            contenido_seminario ON seminario.id_contenido = contenido_seminario.id_contenido) AS seminario_detalle
    ON certificado.id_seminario = seminario_detalle.id_seminario
    INNER JOIN
        alumnos ON certificado.id_alumno = alumnos.id_alumno
    WHERE
        certificado.id_certificado = id_certificado;
END$$

CREATE  PROCEDURE `getContenidoSeminarioById` (IN `contenido_id` INT)   BEGIN
    SELECT *
    FROM contenido_seminario
    WHERE id_contenido = contenido_id;
END$$

CREATE  PROCEDURE `getContenidoSeminarioFilter20` (IN `batch_number` INT)   BEGIN
    DECLARE start_index INT;
    
    SET start_index = (batch_number - 1) * 20;
    
    SELECT *
    FROM contenido_seminario
    LIMIT start_index, 20;
END$$

CREATE  PROCEDURE `getInstructorById` (IN `dp_id_instructor` INT)   BEGIN
    SELECT * FROM instructor WHERE instructor.id_instructor = dp_id_instructor;
END$$

CREATE  PROCEDURE `getInstructores` ()   BEGIN
SELECT * FROM instructor;
END$$

CREATE  PROCEDURE `getSeminarioById` (IN `dp_id_seminario` INT)   BEGIN
    SELECT * FROM seminario WHERE id_seminario = dp_id_seminario;
END$$

CREATE  PROCEDURE `getSeminarioFilter20` (IN `batch_number` INT)   BEGIN
    DECLARE start_index INT;
    
    SET start_index = (batch_number - 1) * 20;
    
    SELECT *
    FROM seminario
    LIMIT start_index, 20;
END$$

CREATE  PROCEDURE `getTipo_usuarioById` (IN `p_id_tipo_usuario` INT)   BEGIN
    SELECT *
    FROM tipo_cliente
    WHERE id_tipo_usuario = p_id_tipo_usuario;
END$$

CREATE  PROCEDURE `getUsuarioById` (IN `p_id_usuario` INT)   BEGIN
    SELECT *
    FROM usuarios
    WHERE id_usuario = p_id_usuario;
END$$

CREATE  PROCEDURE `getUsuariosFilter20` (IN `batch_number` INT)   BEGIN
    DECLARE start_index INT;
    
    SET start_index = (batch_number - 1) * 20;
    
    SELECT *
    FROM usuarios
    LIMIT start_index, 20;
END$$

CREATE  PROCEDURE `searchBarAlumno` (IN `palabraClave` VARCHAR(200))   BEGIN
    SELECT * 
    FROM alumnos 
    WHERE alumnos.nombres LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_p LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_m LIKE CONCAT('%', palabraClave, '%')
       OR alumnos.dni LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.email LIKE CONCAT('%', palabraClave, '%');
END$$

CREATE  PROCEDURE `searchBarContenidoSeminario` (IN `searchTerm` VARCHAR(255))   BEGIN
    SELECT *
    FROM contenido_seminario
    WHERE contenido_seminario.descripcion LIKE CONCAT('%', searchTerm, '%');
END$$

CREATE  PROCEDURE `searchBarInstructor` (IN `searchTerm` VARCHAR(255))   BEGIN
    SELECT *
    FROM instructor
    WHERE nombre LIKE CONCAT('%', searchTerm, '%') 
    OR apellido_p LIKE CONCAT('%', searchTerm, '%') 
    OR apellido_m LIKE CONCAT('%', searchTerm, '%');
END$$

CREATE  PROCEDURE `searchBarSeminario` (IN `searchTerm` VARCHAR(255))   BEGIN
    SELECT *
    FROM seminario
    WHERE nombre LIKE CONCAT('%', searchTerm, '%') 
    OR fecha_inicio LIKE CONCAT('%', searchTerm, '%') 
    OR fecha_termino LIKE CONCAT('%', searchTerm, '%');
END$$

CREATE  PROCEDURE `searchBarUsuario` (IN `searchTerm` VARCHAR(255))   BEGIN
    SELECT *
    FROM usuarios
    WHERE nombre LIKE CONCAT('%', searchTerm, '%') 
    OR apellidos LIKE CONCAT('%', searchTerm, '%');
END$$

CREATE  PROCEDURE `updateAlumno` (IN `dp_id_alumno` INT, IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_email` VARCHAR(255), IN `dp_dni` INT, IN `dp_id__tipo_usuario` INT, IN `dp_contrasena` VARCHAR(255))   BEGIN
    UPDATE alumnos 
    SET 
        nombres = IF(dp_nombre IS NOT NULL AND dp_nombre != '', dp_nombre, nombres),
        apellido_p = IF(dp_apellido_p IS NOT NULL AND dp_apellido_p != '', dp_apellido_p, apellido_p),
        apellido_m = IF(dp_apellido_m IS NOT NULL AND dp_apellido_m != '', dp_apellido_m, apellido_m),
        email = IF(dp_email IS NOT NULL AND dp_email != '', dp_email, email),
        dni = IF(dp_dni IS NOT NULL AND dp_dni != '', dp_dni, dni),
        id_tipo_usuario = IF(dp_id_tipo_usuario IS NOT NULL, dp_id_tipo_usuario, id_tipo_usuario),
        contrasena = IF(dp_contrasena IS NOT NULL AND dp_contrasena != '', dp_contrasena, contrasena)
    WHERE id_alumno = dp_id_alumno;
    
END$$

CREATE  PROCEDURE `updateCertificado` (IN `dp_id_certificado` INT, IN `dp_id_alumno` VARCHAR(255), IN `dp_id_seminario` VARCHAR(255))   BEGIN
    IF dp_id_alumno IS NOT NULL AND dp_id_alumno != '' THEN
        UPDATE certificado SET certificado.id_alumno = dp_id_alumno WHERE certificado.id_certificado = dp_id_certificado;
    END IF;

    IF dp_id_seminario IS NOT NULL AND dp_id_seminario != '' THEN
        UPDATE certificado SET certificado.id_seminario = dp_id_seminario WHERE certificado.id_certificado = dp_id_certificado;
    END IF;

END$$

CREATE  PROCEDURE `updateContenido` (IN `dp_id_contenido` INT, IN `dp_contenido` VARCHAR(3000))   BEGIN
	UPDATE contenido_seminario SET contenido_seminario.descripcion = dp_contenido WHERE contenido_seminario.id_contenido = dp_id_contenido;
END$$

CREATE  PROCEDURE `updateInstructor` (IN `dp_id_instructor` INT, IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_firma` VARCHAR(255))   BEGIN
    IF dp_nombre IS NOT NULL AND dp_nombre != '' THEN
        UPDATE instructor SET instructor.nombre = dp_nombre WHERE instructor.id_instructor = dp_id_instructor;
    END IF;

    IF dp_apellido_p IS NOT NULL AND dp_apellido_p != '' THEN
        UPDATE instructor SET instructor.apellido_p = dp_apellido_p WHERE instructor.id_instructor = dp_id_instructor;
    END IF;

    IF dp_apellido_m IS NOT NULL AND dp_apellido_m != '' THEN
        UPDATE instructor SET instructor.apellido_m = dp_apellido_m WHERE instructor.id_instructor = dp_id_instructor;
    END IF;

    IF dp_firma IS NOT NULL AND dp_firma != '' THEN
        UPDATE instructor SET instructor.firma_instructor = dp_firma WHERE instructor.id_instructor = dp_id_instructor;
    END IF;
END$$

CREATE  PROCEDURE `updateSeminario` (IN `dp_id_seminario` INT, IN `dp_nombre_seminario` VARCHAR(255), IN `dp_fecha_inicio` DATE, IN `dp_fecha_termino` DATE, IN `dp_horas_totales` INT, IN `dp_id_instructor` INT, IN `dp_id_contenido_seminario` INT)   BEGIN
    IF dp_nombre_seminario IS NOT NULL AND dp_nombre_seminario != '' THEN
        UPDATE seminario SET seminario.nombre = dp_nombre_seminario WHERE seminario.id_seminario = dp_id_seminario;
    END IF;

    IF dp_fecha_inicio IS NOT NULL THEN
        UPDATE seminario SET seminario.fecha_inicio = dp_fecha_inicio WHERE seminario.id_seminario = dp_id_seminario;
    END IF;

    IF dp_fecha_termino IS NOT NULL THEN
        UPDATE seminario SET seminario.fecha_termino = dp_fecha_termino WHERE seminario.id_seminario = dp_id_seminario;
    END IF;

    IF dp_horas_totales IS NOT NULL THEN
        UPDATE seminario SET seminario.hora_total = dp_horas_totales WHERE seminario.id_seminario = dp_id_seminario;
    END IF;

    IF dp_id_instructor IS NOT NULL THEN
        UPDATE seminario SET seminario.id_instructor = dp_id_instructor WHERE seminario.id_seminario = dp_id_seminario;
    END IF;

    IF dp_id_contenido_seminario IS NOT NULL THEN
        UPDATE seminario SET seminario.id_contenido = dp_id_contenido_seminario WHERE seminario.id_seminario = dp_id_seminario;
    END IF;
    
END$$

CREATE  PROCEDURE `updateTipo_usuario` (IN `p_id_tipo_usuario` INT, IN `p_nombre` VARCHAR(255))   BEGIN
    UPDATE tipo_cliente
    SET nombre = p_nombre
    WHERE id_tipo_usuario = p_id_tipo_usuario;
END$$

CREATE  PROCEDURE `updateUsuario` (IN `p_id_usuario` INT, IN `p_nombre` VARCHAR(255), IN `p_apellidos` VARCHAR(255), IN `p_contraseña` VARCHAR(255), IN `p_id_tipo_usuario` INT)   BEGIN
    UPDATE usuarios
    SET nombre = p_nombre,
        apellidos = p_apellidos,
        contraseña = p_contraseña,
        id_tipo_usuario = p_id_tipo_usuario
    WHERE id_usuario = p_id_usuario;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellido_p` varchar(200) NOT NULL,
  `apellido_m` varchar(200) NOT NULL,
  `dni` int(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contrasena` varchar(12) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombres`, `apellido_p`, `apellido_m`, `dni`, `email`, `contrasena`, `id_tipo_usuario`) VALUES
(9, 'Angely', 'Huaranga', 'Hurtado', 7345236, 'angely.sjb@gmail.com', 'Angely123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificado`
--

CREATE TABLE `certificado` (
  `id_certificado` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_seminario` int(11) NOT NULL,
  `link` varchar(700) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido_seminario`
--

CREATE TABLE `contenido_seminario` (
  `id_contenido` int(11) NOT NULL,
  `descripcion` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contenido_seminario`
--

INSERT INTO `contenido_seminario` (`id_contenido`, `descripcion`) VALUES
(1, '1)holaaaa , 2) Nolose, 3) aASKJDNAS'),
(5, 'KJASDBKJASDASDAS'),
(6, '0'),
(7, 'Buneas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instructor`
--

CREATE TABLE `instructor` (
  `id_instructor` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido_p` varchar(200) NOT NULL,
  `apellido_m` varchar(200) NOT NULL,
  `firma_instructor` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `instructor`
--

INSERT INTO `instructor` (`id_instructor`, `nombre`, `apellido_p`, `apellido_m`, `firma_instructor`) VALUES
(1, 'Ciro', 'SD', 'SD', 'SDFSDVZXCVDX'),
(2, 'asf', 'asvzxv', 'zxv', 'qwefasdg'),
(5, 'Angely', 'Huaranga', 'asd', 'asf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seminario`
--

CREATE TABLE `seminario` (
  `id_seminario` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `hora_total` int(11) NOT NULL,
  `id_instructor` int(11) NOT NULL,
  `id_contenido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seminario`
--

INSERT INTO `seminario` (`id_seminario`, `nombre`, `fecha_inicio`, `fecha_termino`, `hora_total`, `id_instructor`, `id_contenido`) VALUES
(1, 'AIRE ACONDICIONADO', '2024-06-02', '2024-06-26', 500, 1, 1),
(2, 'REFRIGERACION COMERCIAL', '2024-06-03', '2024-06-19', 500, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cliente`
--

CREATE TABLE `tipo_cliente` (
  `id_tipo_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_cliente`
--

INSERT INTO `tipo_cliente` (`id_tipo_usuario`, `nombre`) VALUES
(1, 'administrador'),
(2, 'trabajador'),
(3, 'alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`),
  ADD KEY `fk_alumnos_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `certificado`
--
ALTER TABLE `certificado`
  ADD PRIMARY KEY (`id_certificado`),
  ADD KEY `Alumno_Seminario_Alumnos_FK` (`id_alumno`),
  ADD KEY `Alumno_Seminario_Seminario_FK` (`id_seminario`);

--
-- Indices de la tabla `contenido_seminario`
--
ALTER TABLE `contenido_seminario`
  ADD PRIMARY KEY (`id_contenido`);

--
-- Indices de la tabla `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id_instructor`);

--
-- Indices de la tabla `seminario`
--
ALTER TABLE `seminario`
  ADD PRIMARY KEY (`id_seminario`),
  ADD KEY `Seminario_Instructor_FK` (`id_instructor`),
  ADD KEY `Seminario_Contenido_FK` (`id_contenido`);

--
-- Indices de la tabla `tipo_cliente`
--
ALTER TABLE `tipo_cliente`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_tipo_usuario` (`id_tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `certificado`
--
ALTER TABLE `certificado`
  MODIFY `id_certificado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `contenido_seminario`
--
ALTER TABLE `contenido_seminario`
  MODIFY `id_contenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id_instructor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `seminario`
--
ALTER TABLE `seminario`
  MODIFY `id_seminario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_cliente`
--
ALTER TABLE `tipo_cliente`
  MODIFY `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `fk_alumnos_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_cliente` (`id_tipo_usuario`);

--
-- Filtros para la tabla `certificado`
--
ALTER TABLE `certificado`
  ADD CONSTRAINT `Alumno_Seminario_Alumnos_FK` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Alumno_Seminario_Seminario_FK` FOREIGN KEY (`id_seminario`) REFERENCES `seminario` (`id_seminario`) ON DELETE NO ACTION;

--
-- Filtros para la tabla `seminario`
--
ALTER TABLE `seminario`
  ADD CONSTRAINT `Seminario_Contenido_FK` FOREIGN KEY (`id_contenido`) REFERENCES `contenido_seminario` (`id_contenido`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Seminario_Instructor_FK` FOREIGN KEY (`id_instructor`) REFERENCES `instructor` (`id_instructor`) ON DELETE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_cliente` (`id_tipo_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
