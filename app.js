const {
  buildConnectionOptions,
  createConnection,
} = require(`./config/dbConfig`);
const inquirer = require("inquirer");
const dbDeclaration = require("./config/dbDeclerations");
const {
  initialSelection,
  departmentOptions,
  addDepartment,
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
        `SELECT roles.*, departments.name AS department_name
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
        await connection.query(`  SELECT employees.*, roles.name AS job_title, roles.salary, departments.name AS department_name
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id`);
      console.table(result);
      console.log("employees working");
    } catch (err) {
      console.error(err);
    }
  }
  //     const { addDepartment: newDepartmentName } = await inquirer.prompt(
  //       addDepartment
  //     );
  //     dbDeclaration(departmentList, newDepartmentName);
  //   } else {
  //     dbDeclaration(departmentList);
}

async function main() {
  const connection = await createConnection(buildConnectionOptions());
  await askQuestions();
}

main();
