USE `employee_db`;

INSERT INTO `departments`(name) 
VALUES ("IT")
, ("SALES")
, ("HR");

INSERT INTO `roles`(name,department_name,salary) 
VALUES ("manager","SALES",200)
, ("developer","HR",200)
, ("typist","IT",200);


INSERT INTO `employees`(name) 
VALUES ("babs")
, ("marge")
, ("sunny");