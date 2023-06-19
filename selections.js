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
    "add an employee",
    "update an employee role",
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

const addEmployee = [
  {
    type: "input",
    name: "firstName",
    message: `First Name to be Added:`,
    default: null,
  },
  {
    type: "input",
    name: "lastName",
    message: `Last Name to be Added:`,
    default: null,
  },
  {
    type: "list",
    name: "roleId",
    message: "Select Role Employee is Assigned To:",
    choices: async () => {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [roles] = await connection.query("SELECT id, name FROM roles;");
      return roles.map(({ id, name }) => ({
        name,
        value: id.toString(),
      }));
    },
  },
  {
    type: "confirm",
    name: "managerStatus",
    message: "Is this employee a manager?",
    default: 0,
  },
  {
    type: "list",
    name: "managerId",
    message: "Select Employee Manager",
    choices: async () => {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [employees] = await connection.query(
        "SELECT id, last_name FROM employees WHERE employees.isManager = 1;"
      );
      return employees.map(({ id, last_name }) => ({
        name: `${last_name}`,
        value: id.toString(),
      }));
    },
  },
];

const updateRole = [
  {
    type: "list",
    name: "updateEmployee",
    choices: async () => {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [changeRole] = await connection.query(
        "SELECT last_name, id FROM employees;"
      );
      return changeRole.map(({ id, last_name }) => ({
        last_name,
        value: id.toString(),
      }));
    },
  },
  {
    type: "list",
    name: "updatedRole",
    message: "select new role:",
    choices: async () => {
      const connection = await mysql.createConnection(buildConnectionOptions());
      const [roles] = await connection.query("SELECT id, name FROM roles;");
      return roles.map(({ id, name }) => ({
        name,
        value: id.toString(),
      }));
    },
  },
];

module.exports = {
  initialSelection,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
};
