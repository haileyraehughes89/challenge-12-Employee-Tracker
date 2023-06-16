const mysql = require("mysql2/promise");
const { buildConnectionOptions } = require("./dbConfig");
const {
  tableOptions,
  departmentOptions,
  addDepartment,
} = require("../selections");

async function dbDeclaration(tableOptions) {
  if (tableOptions === "view all departments") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query("SELECT * FROM departments;");
      console.table(result);
      console.log("departments working");
    } catch (err) {
      console.error(err);
    }
  } else if (tableOptions === "view all roles") {
    try {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [result] = await connection.query("SELECT * FROM roles;");
      console.table(result);
      console.log("tables working");
    } catch (err) {
      console.error(err);
    }

    // if (selection === "Create a department") {
    //   try {
    //     const connection = await mysql.createConnection(buildConnectionOptions());
    //     await connection.query(
    //       `INSERT INTO departments (name) VALUES ('${input}');`
    //     );
    //     const [updated] = await connection.query("SELECT * FROM departments;");
    //     console.table(updated);
    //   } catch (err)//
  }
}

module.exports = dbDeclaration;
