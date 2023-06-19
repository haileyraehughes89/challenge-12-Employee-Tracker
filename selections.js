const mysql = require("mysql2/promise");
const {
  buildConnectionOptions,
  createConnection,
} = require("./config/dbConfig");

const initialSelection = {
  type: "list",
  name: "initialList",
  choices: [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
  ],
};

const addDepartment = {
  type: "input",
  name: "departmentName",
  message: `Name Department to be Added:`,
  default: null,
};

const addRole = [
  {
    type: "input",
    name: "roleName",
    message: `Name Role to be Added:`,
    default: null,
  },
  {
    type: "input",
    name: "roleSalary",
    message: `Enter Role Salary:`,
    default: null,
  },
  {
    type: "list",
    name: "departmentId",
    message: "Select Department Role is Assigned To:",
    choices: async () => {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [departments] = await connection.query(
        "SELECT id, name FROM departments;"
      );
      return departments.map(({ id, name }) => ({
        name,
        value: id.toString(),
      }));
    },
  },
];

module.exports = { initialSelection, addDepartment, addRole };
