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
    , `department_id` INT
    , `department_name` VARCHAR(30) NOT NULL
    , `salary` INT

    ,FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`)
    , FOREIGN KEY (`department_name`) REFERENCES `departments`(`name`)
);

CREATE TABLE `employees`(
    `employee_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) UNIQUE NOT NULL
);


