const {
  buildConnectionOptions,
  createConnection,
} = require(`./config/dbConfig`);
const inquirer = require("inquirer");
const dbDeclaration = require("./config/dbDeclerations");
const {
  initialSelection,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
} = require("./selections");
const mysql = require("mysql2/promise");

async function askQuestions() {
  const { initialList } = await inquirer.prompt(initialSelection);

  if (initialList === "view all departments") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query("SELECT * FROM departments;");
      console.table(result);
      console.log("departments working");
    } catch (err) {
      console.error(err);
    }
  } else if (initialList === "view all roles") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query(
        `SELECT roles.id, roles.name, roles.salary, departments.name AS department_name
        FROM roles 
        JOIN departments ON roles.department_id = departments.id;`
      );
      console.table(result);
      console.log("roles working");
    } catch (err) {
      console.error(err);
    }
  } else if (initialList === "view all employees") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] =
        await connection.query(`  SELECT employees.id, employees.first_name, employees.last_name, roles.name AS job_title, roles.salary, departments.name AS department_name, managerId
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id`);
      console.table(result);
      console.log("employees working");
    } catch (err) {
      console.error(err);
    }
  } else if (initialList === "add a department") {
    const { departmentName } = await inquirer.prompt(addDepartment);

    const connection = await mysql.createConnection(buildConnectionOptions());
    await connection.query(
      `INSERT INTO departments (name) VALUES ('${departmentName}');`
    );
    const [updated] = await connection.query("SELECT * FROM departments;");
    console.table(updated);
  } else if (initialList === "add a role") {
    const { roleName, roleSalary, departmentId } = await inquirer.prompt(
      addRole
    );

    const connection = await mysql.createConnection(buildConnectionOptions());
    await connection.query(
      `INSERT INTO roles (name, salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${departmentId}');`
    );
    const [updated] = await connection.query("SELECT * FROM roles;");
    const [result] = await connection.query(
      `SELECT roles.*, departments.name AS department_name
        FROM roles 
        JOIN departments ON roles.department_id = departments.id;`
    );
    console.table(result);
  } else if (initialList === "add an employee") {
    const { firstName, lastName, roleId, managerStatus, managerId } =
      await inquirer.prompt(addEmployee);
    const isManager = managerStatus ? 1 : 0;

    const connection = await mysql.createConnection(buildConnectionOptions());
    await connection.query(
      `INSERT INTO employees (first_name, last_name, role_id, isManager, managerId) VALUES ('${firstName}', '${lastName}', '${roleId}', '${isManager}', '${managerId}');`
    );
    const [updated] = await connection.query("SELECT * FROM employees;");
    const [result] =
      await connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.name AS job_title, roles.salary, departments.name AS department_name, managerId
      FROM employees
      JOIN roles ON employees.role_id = roles.id
      JOIN departments ON roles.department_id = departments.id`);
    console.table(result);
  } else if (initialList === "update an employee role") {
    const { updateEmployee, updatedRole } = await inquirer.prompt(updateRole);

    const connection = await mysql.createConnection(buildConnectionOptions());
    await connection.query(
      `UPDATE employees SET role_id = '${updatedRole}' WHERE id = '${updateEmployee}'`
    );
    const [updated] = await connection.query("SELECT * FROM employees;");
    const [result] =
      await connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.name AS job_title, roles.salary, departments.name AS department_name, managerId
      FROM employees
      JOIN roles ON employees.role_id = roles.id
      JOIN departments ON roles.department_id = departments.id`);
    console.table(result);
  }
}
async function main() {
  const connection = await createConnection(buildConnectionOptions());
  await askQuestions();
}

main();
