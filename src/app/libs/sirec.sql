SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE db_sirec;
USE db_sirec;

CREATE TABLE `tbl_roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador de rol.',
  `name_rol` varchar(32) NOT NULL COMMENT 'Nombre de rol.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de roles.';

INSERT INTO `tbl_roles` (id_rol, name_rol) VALUES
(1, 'Administrador'),
(2, 'Desarrollador'),
(3, 'General');

CREATE TABLE `tbl_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador de usuario.',
  `email_user` varchar(48) NOT NULL UNIQUE COMMENT 'Correo de usuario.',
  `password_user` varchar(255) NOT NULL COMMENT 'Contraseña de usuario.',
  `name_user` varchar(32) NOT NULL COMMENT 'Nombre de usuario.',
  `id_rol` int(11) NOT NULL COMMENT 'Identificador de rol.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),

  FOREIGN KEY (`id_rol`) REFERENCES `tbl_roles`(`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios.';


INSERT INTO `tbl_users` (id_user, email_user, password_user, name_user, id_rol) VALUES
(1, 'eduardo@admin.com', '$2a$10$5dvJO4wr08MM1FJvLjJIe.Al2QvqO/BHO0mCQEvJa2SAPryT8tOuy', 'Eduardo A', 1),
(2, 'eduardo@dev.com', '$2a$10$lGUgR76myFebqgZw6b3YQOpZWYPVPywkM18CRwY37BIXVxqgMU9Wi', 'Eduardo D', 2),
(3, 'eduardo@general.com', '$2a$10$iktNKJeBArNkaOphXDnP9uLKS8yeFP.6XjYSMeUnWpd9tuQZAMsLm', 'Eduardo G', 3);

COMMIT;