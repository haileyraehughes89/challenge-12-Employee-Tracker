USE `employee_db`;

INSERT INTO `departments`(name) 
VALUES ("IT")
, ("SALES")
, ("HR");

INSERT INTO `roles`(name, department_id, salary) 
VALUES ("artist",2,600)
, ("developer",3,700)
, ("typist",2,300);


INSERT INTO `employees`(first_name, last_name, role_id, isManager, managerId) 
VALUES ("babs", "blabs", 2, 1, 2)
, ("marge", "barge", 2, 0, 2)
, ("sunny", "bunny", 3, 0, 2);


