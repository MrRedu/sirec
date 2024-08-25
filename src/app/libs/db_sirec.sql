SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- ! Crear la base de datos
CREATE DATABASE db_sirec;
USE db_sirec;
-- ! ------------------------------- !--


--  * -----------------------------------------------------------------------------------------------------------------------------
-- ! Tabla de roles para los usuarios del sistema
CREATE TABLE `tbl_roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador de rol.',
  `name_rol` varchar(32) NOT NULL COMMENT 'Nombre de rol.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de roles.';
INSERT INTO `tbl_roles` (id_rol, name_rol) VALUES (1, 'Administrador'), (2, 'Desarrollador'), (3, 'General');
-- ! ------------------------------- !--

-- ! Tabla de usuarios del sistema
CREATE TABLE `tbl_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador del usuario.',
  `email_user` varchar(48) NOT NULL UNIQUE COMMENT 'Correo del usuario.',
  `password_user` varchar(255) NOT NULL COMMENT 'Contraseña del usuario.',
  `name_user` varchar(32) NOT NULL COMMENT 'Nombre del usuario.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
-- FOREIGN KEYS
  `id_rol` int(11) NOT NULL COMMENT 'Identificador del rol para el usuario.',
  FOREIGN KEY (`id_rol`) REFERENCES `tbl_roles`(`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios.';
INSERT INTO `tbl_users` (`id_user`, `email_user`, `password_user`, `name_user`, `id_rol`) VALUES
(1, 'eduardo@admin.com', '$2a$10$5dvJO4wr08MM1FJvLjJIe.Al2QvqO/BHO0mCQEvJa2SAPryT8tOuy', 'Eduardo A', 1),
(2, 'eduardo@dev.com', '$2a$10$lGUgR76myFebqgZw6b3YQOpZWYPVPywkM18CRwY37BIXVxqgMU9Wi', 'Eduardo D', 2),
(3, 'eduardo@general.com', '$2a$10$iktNKJeBArNkaOphXDnP9uLKS8yeFP.6XjYSMeUnWpd9tuQZAMsLm', 'Eduardo G', 3);
-- ! ------------------------------- !--
-- * -----------------------------------------------------------------------------------------------------------------------------



-- * -----------------------------------------------------------------------------------------------------------------------------
-- ! Tablas de los estados de los radios
CREATE TABLE `tbl_status_radio` (
  `id_status_radio` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del estado del radio.',
  `nombre_status` varchar(32) NOT NULL COMMENT 'Nombre del estado del radio.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de los estados del radio.';
INSERT INTO `tbl_status_radio` (`id_status_radio`, `nombre_status`) VALUES
(1, 'Operativo'), (2, 'Inoperativo'), (3, 'Entregado'), (4, 'Nuevo'), (5, 'Vacaciones'), (6, 'Extraviado'), (7, 'Externo'), (8, 'En mantenimiento'), (9, 'En garantía'), (10, 'Desincorporado'), (11, 'En depósito');
-- ! ------------------------------- !--


-- ! Tablas de las marcas de los radios
CREATE TABLE `tbl_marcas` (
  `id_marca` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la marca de radio.',
  `nombre_marca` varchar(32) NOT NULL COMMENT 'Nombre de la marca de radio.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de las marcas de radio.';
INSERT INTO `tbl_marcas` (`id_marca`, `nombre_marca`) VALUES (1, 'Motorola'), (2, 'Huawei');
-- ! ------------------------------- !--


-- ! Tablas de los modelos de los radios
CREATE TABLE `tbl_modelos` (
  `id_modelo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del modelo de radio.',
  `nombre_modelo` varchar(32) NOT NULL COMMENT 'Nombre del modelo de radio.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de los modelos de radio';
INSERT INTO `tbl_modelos` (`id_modelo`, `nombre_modelo`) VALUES (1, 'MTP850'), (2, 'MTP3550'), (3, 'MTP5400');
-- ! ------------------------------- !--


-- ! Tablas de los tipos de los radios
CREATE TABLE `tbl_tipos` (
  `id_tipo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del tipo de radio.',
  `nombre_tipo` varchar(32) NOT NULL COMMENT 'Nombre del tipo de radio.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de tipos de radio.';
INSERT INTO `tbl_tipos` (`id_tipo`, `nombre_tipo`) VALUES (1, 'Radio portátil'), (2, 'Radio móvil'), (3, 'Radio fijo');
-- ! ------------------------------- !--

-- ! Tablas de los radios
CREATE TABLE `tbl_radios` (
  `id_radio` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del radio.',
  `serial_radio` varchar(16) NOT NULL UNIQUE COMMENT 'Serial del radio.',
  `tei_radio` varchar(24) DEFAULT NULL COMMENT 'TEI del radio.',
  `issi_radio` varchar(16) DEFAULT NULL COMMENT 'ISSI registrado para el radio.',
  `num_bien_radio` varchar(9) DEFAULT NULL COMMENT 'Número de bien del radio.',
  `observacion_radio` varchar(255) DEFAULT NULL COMMENT 'Observación/detalles del radio.',
  -- FOREIGN KEYS
  `id_status_radio` int(11) DEFAULT NULL COMMENT 'ID del status del radio.',
  `id_marca_radio` int(11) NOT NULL COMMENT 'ID de la marca del radio.',
  `id_modelo_radio` int(11) NOT NULL COMMENT 'ID del modelo del radio.',
  `id_tipo_radio` int(11) NOT NULL COMMENT 'ID del tipo del radio.',
  FOREIGN KEY (`id_status_radio`) REFERENCES `tbl_status_radio`(`id_status_radio`),
  FOREIGN KEY (`id_marca_radio`) REFERENCES `tbl_marcas`(`id_marca`),
  FOREIGN KEY (`id_modelo_radio`) REFERENCES `tbl_modelos`(`id_modelo`),
  FOREIGN KEY (`id_tipo_radio`) REFERENCES `tbl_tipos`(`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de radios.';
INSERT INTO `tbl_radios` (`id_radio`, `serial_radio`, `tei_radio`, `issi_radio`, `num_bien_radio`, `observacion_radio`, `id_status_radio`, `id_marca_radio`, `id_modelo_radio`, `id_tipo_radio`) VALUES
(1, '890TPA0102', 'T000123456789', '202401', '3560', 'Carcasa desgastada', 1, 1, 1, 1);
-- ! ------------------------------- !--
-- * -----------------------------------------------------------------------------------------------------------------------------



-- * -----------------------------------------------------------------------------------------------------------------------------
-- ! Tablas de los estados del funcionario
CREATE TABLE `tbl_status_funcionario` (
  `id_status_funcionario` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del estado del funcionario.',
  `nombre_status` varchar(32) NOT NULL COMMENT 'Nombre del estado del funcionario.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de los estados del funcionario.';
INSERT INTO `tbl_status_funcionario` (`id_status_funcionario`, `nombre_status`) VALUES (1, 'Activo'), (2, 'Inactivo'), (3, 'Permiso'), (4, 'Reposo'), (5, 'Vacaciones');
-- ! ------------------------------- !--

-- ! Tablas de los organismos del funcionario
CREATE TABLE `tbl_organismos` (
  `id_organismo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del organismo.',
  `nombre_organismo` varchar(128) NOT NULL COMMENT 'Nombre del organismo.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `tbl_organismos` (`id_organismo`, `nombre_organismo`) VALUES (1, 'Servicio Desconcentrado de Telecomunicaciones Aragua'), (2, 'Policía Bolivariana de Aragua'), (3, 'Policía Bolivariana Nacional');
-- ! ------------------------------- !--

-- ! Tablas de los grupos del funcionario
CREATE TABLE `tbl_grupos` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del grupo.',
  `nombre_grupo` varchar(48) NOT NULL COMMENT 'Nombre del grupo.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `tbl_grupos` (`id_grupo`, `nombre_grupo`) VALUES (1, 'Dpto. de Sistemas'), (2, 'Dpto. de Telecomunicaciones');
-- ! ------------------------------- !--

-- ! Tablas de los rangos del funcionario
CREATE TABLE `tbl_rangos` (
  `id_rango` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del rango.',
  `nombre_rango` varchar(48) NOT NULL COMMENT 'Nombre del rango.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `tbl_rangos` (`id_rango`, `nombre_rango`) VALUES (1, 'Técnico'), (2, 'Coordinador'), (3, 'Director'), (4, 'Gerente');
-- ! ------------------------------- !--

-- ! Tabla de los funcionarios
CREATE TABLE `tbl_funcionarios` (
  `id_funcionario` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del funcionario.',
  `cedula_funcionario` int(16) NOT NULL UNIQUE COMMENT 'Cédula de identidad del funcionario.',
  `nombres_funcionario` varchar(32) NOT NULL COMMENT 'Nombres del funcionario.',
  `apellidos_funcionario` varchar(32) NOT NULL COMMENT 'Apellidos del funcionario.',
  `telefono_funcionario` varchar(16) NOT NULL COMMENT 'Número de teléfono del funcionario.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha y hora en que se registró al funcionario.',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Fecha y hora en que se actualizó la última vez alguna información del funcionario.',
  -- FOREIGN KEYS
  `id_status_funcionario` int(11) NOT NULL COMMENT 'ID del estado del funcionario.',
  `id_organismo_funcionario` int(11) NOT NULL COMMENT 'ID del organismo al que pertenece el funcionario.',
  `id_grupo_funcionario` int(11) NOT NULL COMMENT 'ID del grupo al que pertenece el funcionario.',
  `id_rango_funcionario` int(11) NOT NULL COMMENT 'ID del rango que posee el funcionario.',
  FOREIGN KEY (`id_status_funcionario`) REFERENCES `tbl_status_funcionario`(`id_status_funcionario`), 
  FOREIGN KEY (`id_organismo_funcionario`) REFERENCES `tbl_organismos`(`id_organismo`),
  FOREIGN KEY (`id_grupo_funcionario`) REFERENCES `tbl_grupos`(`id_grupo`),
  FOREIGN KEY (`id_rango_funcionario`) REFERENCES `tbl_rangos`(`id_rango`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de los funcionarios.';
INSERT INTO `tbl_funcionarios` (`id_funcionario`, `cedula_funcionario`, `nombres_funcionario`, `apellidos_funcionario`, `id_status_funcionario`, `telefono_funcionario`, `id_organismo_funcionario`, `id_grupo_funcionario`, `id_rango_funcionario`, `created_at`, `updated_at`) VALUES
(1, 12123456, 'Eduardo Jesús', 'Rodríguez Borjas', 1, '041212345678', 1, 1, 1, '2024-07-14 02:24:35', '2024-07-14 02:24:35');
-- ! ------------------------------- !--

-- * -----------------------------------------------------------------------------------------------------------------------------


COMMIT;
