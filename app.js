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
      const [result] = await connection.query("SELECT * FROM roles;");
      console.table(result);
      console.log("roles working");
    } catch (err) {
      console.error(err);
    }
  } else if (initialList === "view all employees") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query("SELECT * FROM employees;");
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
