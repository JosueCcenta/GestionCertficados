-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2024 a las 04:02:28
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `createCertificado` (IN `dp_id_alumno` INT, IN `dp_id_seminario` INT)   BEGIN
INSERT INTO certificado(certificado.id_alumno,certificado.id_seminario) VALUES (dp_id_alumno,dp_id_seminario) ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createContenidoSeminario` (IN `dp_contenido` VARCHAR(3000))   BEGIN
INSERT INTO contenido_seminario(descripcion) VALUES(dp_contenido);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createInstructor` (IN `dp_nombre` VARCHAR(200), IN `dp_apellidop` VARCHAR(200), IN `dp_apellidom` VARCHAR(200))   BEGIN
INSERT INTO instructor(instructor.nombre,instructor.apellido_p,instructor.apellido_m) VALUES(dp_nombre,dp_apellidop,dp_apellidom);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createSeminario` (IN `dp_nombre_seminario` VARCHAR(255), IN `dp_fecha_inicio` DATE, IN `dp_fecha_termino` DATE, IN `dp_horas_totales` INT, IN `dp_id_instructor` INT, IN `dp_id_contenido_seminario` INT)   BEGIN
    INSERT INTO seminario (seminario.nombre, seminario.fecha_inicio, seminario.fecha_termino, seminario.hora_total, seminario.id_instructor,seminario.id_contenido)
    VALUES (dp_nombre_seminario, dp_fecha_inicio, dp_fecha_termino, dp_horas_totales, dp_id_instructor,dp_id_contenido_seminario);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAlumno` (IN `dp_id_alumno` INT)   BEGIN
DELETE FROM alumnos WHERE alumnos.id_alumno = dp_id_alumno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteContenido` (IN `dp_id_contenido` INT)   BEGIN
DELETE FROM contenido_seminario WHERE contenido_seminario.id_contenido = dp_id_contenido;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteInstructor` (IN `dp_id_instructor` INT)   BEGIN
DELETE FROM instructor WHERE instructor.id_instructor = dp_id_instructor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteSeminario` (IN `dp_id_seminario` INT)   BEGIN
    DELETE FROM seminario WHERE id_seminario = dp_id_seminario;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getInstructorById` (IN `dp_id_instructor` INT)   BEGIN
    SELECT * FROM instructor WHERE instructor.id_instructor = dp_id_instructor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getInstructores` ()   BEGIN
SELECT * FROM instructor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSeminarioById` (IN `dp_id_seminario` INT)   BEGIN
    SELECT * FROM seminario WHERE id_seminario = dp_id_seminario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchBarAlumno` (IN `palabraClave` VARCHAR(200))   BEGIN
    SELECT * 
    FROM alumnos 
    WHERE alumnos.nombres LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_p LIKE CONCAT('%', palabraClave, '%') 
       OR alumnos.apellido_m LIKE CONCAT('%', palabraClave, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAlumno` (IN `dp_id_alumno` INT, IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_email` VARCHAR(255))   BEGIN 
    UPDATE alumnos 
    SET nombres = dp_nombre,
        apellido_p = dp_apellido_p,
        apellido_m = dp_apellido_m,
        email = dp_email 
    WHERE id_alumno = dp_id_alumno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCertificado` (IN `dp_id_certificado` INT, IN `dp_id_alumno` VARCHAR(255), IN `dp_id_seminario` VARCHAR(255))   BEGIN
    IF dp_id_alumno IS NOT NULL AND dp_id_alumno != '' THEN
        UPDATE certificado SET certificado.id_alumno = dp_id_alumno WHERE certificado.id_certificado = dp_id_certificado;
    END IF;

    IF dp_id_seminario IS NOT NULL AND dp_id_seminario != '' THEN
        UPDATE certificado SET certificado.id_seminario = dp_id_seminario WHERE certificado.id_certificado = dp_id_certificado;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateContenido` (IN `dp_id_contenido` INT, IN `dp_contenido` VARCHAR(3000))   BEGIN
	UPDATE contenido_seminario SET contenido_seminario.descripcion = dp_contenido WHERE contenido_seminario.id_contenido = dp_id_contenido;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateInstructor` (IN `dp_id_instructor` INT, IN `dp_nombre` VARCHAR(255), IN `dp_apellido_p` VARCHAR(255), IN `dp_apellido_m` VARCHAR(255), IN `dp_firma` VARCHAR(255))   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSeminario` (IN `dp_id_seminario` INT, IN `dp_nombre_seminario` VARCHAR(255), IN `dp_fecha_inicio` DATE, IN `dp_fecha_termino` DATE, IN `dp_horas_totales` INT, IN `dp_id_instructor` INT, IN `dp_id_contenido_seminario` INT)   BEGIN
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
