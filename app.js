const {
  buildConnectionOptions,
  createConnection,
} = require(`./config/dbConfig`);
const inquirer = require("inquirer");
const dbDeclaration = require("./config/dbDeclerations");
const { departmentOptions, addDepartment } = require("./selections");
const mysql = require("mysql2/promise");

async function askQuestions() {
  const { departmentList } = await inquirer.prompt(departmentOptions);

  if (departmentList === "Create a department") {
    const { addDepartment: newDepartmentName } = await inquirer.prompt(
      addDepartment
    );
    dbDeclaration(departmentList, newDepartmentName);
  } else {
    dbDeclaration(departmentList);
  }
}
async function main() {
  const connection = await createConnection(buildConnectionOptions());
  await askQuestions();
}

main();
