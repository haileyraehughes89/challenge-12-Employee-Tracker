USE `employee_db`;

INSERT INTO `departments`(name) 
VALUES ("IT")
, ("SALES")
, ("HR");

INSERT INTO `roles`(name, department_id, salary) 
VALUES ("manager",2,200)
, ("developer",3,200)
, ("typist",2,200);

SELECT *
FROM roles
JOIN departments ON roles.department_id = departments.id;


INSERT INTO `employees`(first_name, last_name, role_id, manager) 
VALUES ("babs", "blabs", 2,"manager")
, ("marge", "barge", 2, "manager name")
, ("sunny", "bunny", 3, "manager smanager");

SELECT *
FROM employees
JOIN roles ON employees.role_id = roles.name;