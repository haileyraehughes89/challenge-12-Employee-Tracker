DROP DATABASE IF EXISTS `employee_db`;
CREATE DATABASE IF NOT EXISTS `employee_db`;

USE employee_db;

CREATE TABLE `departments`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE `roles`(
    `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `name` VARCHAR(30) UNIQUE NOT NULL
    , `salary` INT
    , `department_id` INT

    ,FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`)
);

CREATE TABLE `employees`(
    `id` INT AUTO_INCREMENT PRIMARY KEY
    , `first_name` VARCHAR(30) UNIQUE NOT NULL
    , `last_name` VARCHAR(30) UNIQUE NOT NULL
    , `role_id` INT NOT NULL
    , `isManager` TINYINT(1) NOT NULL
    , `managerId` INT
    , FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)

);
