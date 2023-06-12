const mysql = require("mysql2/promise");
const { buildConnectionOptions } = require("./dbConfig");
const { departmentOptions, addDepartment } = require("../selections");

async function dbDeclaration(selection, input) {
  if (selection === "Get All Departments") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query("SELECT * FROM departments;");
      console.table(result);
    } catch (err) {
      console.error(err);
    }
  } else if (selection === "Create a department") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      await connection.query(
        `INSERT INTO departments (name) VALUES ('${input}');`
      );
      const [updated] = await connection.query("SELECT * FROM departments;");
      console.table(updated);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = dbDeclaration;
