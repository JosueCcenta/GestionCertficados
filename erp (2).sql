-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2024 a las 23:12:48
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `createAlumno` (IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_email` VARCHAR(255))   BEGIN
    INSERT INTO alumnos (nombres, apellido_p, apellido_m, email)
    VALUES (dp_nombre, dp_apellido_p, dp_apellido_m, dp_email);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAlumno` (IN `dp_id_alumno` INT)   BEGIN
DELETE FROM alumnos WHERE alumnos.id_alumno = dp_id_alumno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAlumnoByWord` (IN `palabraClave` VARCHAR(200))   BEGIN
    SELECT * 
    FROM alumnos 
    WHERE alumnos.nombres LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_p LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_m LIKE CONCAT('%', palabraClave, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAlumnos` ()   BEGIN
	SELECT * FROM alumnos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAlumnosFilter20` (IN `filtro` INT)   BEGIN
    DECLARE limite INT;
    DECLARE minimo INT;
    SET limite = filtro * 10;
    SET minimo = limite - 10;
    SELECT * FROM alumnos LIMIT minimo, limite;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCertificadobyId` (IN `id_certificado` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAlumno` (IN `dp_id_alumno` INT, IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_email` VARCHAR(255))   BEGIN 
    UPDATE alumnos 
    SET nombres = dp_nombre,
        apellido_p = dp_apellido_p,
        apellido_m = dp_apellido_m,
        email = dp_email 
    WHERE id_alumno = dp_id_alumno;
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
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombres`, `apellido_p`, `apellido_m`, `email`) VALUES
(1, 'Josue', '0', 'Sullon', 'sullon.centa@gmail.com'),
(3, 'Angely', 'Huaranga', 'Hurtado', 'angely.sjb@gmail.com'),
(4, 'Ruth', 'Sullon', 'Velasquez', 'rufina.sullon@gmail.com'),
(5, 'Mufi', 'Sullon ', 'Malvinas', 'mufito.malvidas@gmail.com');

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

--
-- Volcado de datos para la tabla `certificado`
--

INSERT INTO `certificado` (`id_certificado`, `id_alumno`, `id_seminario`, `link`) VALUES
(1, 4, 1, 'fgdsdfdfg'),
(2, 3, 2, 'asfasfasasfasfas');

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
(1, '1)holaaaa , 2) Nolose, 3) aASKJDNAS');

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
(2, 'Yaco', 'AS', 'SDVDS', 'SDFSDF');

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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `certificado`
--
ALTER TABLE `certificado`
  MODIFY `id_certificado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `contenido_seminario`
--
ALTER TABLE `contenido_seminario`
  MODIFY `id_contenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id_instructor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `seminario`
--
ALTER TABLE `seminario`
  MODIFY `id_seminario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
