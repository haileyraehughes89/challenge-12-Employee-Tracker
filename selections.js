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
const departmentOptions = {
  type: "list",
  name: "departmentList",
  choices: ["Get All Departments", "Create a department"],
};

const addDepartment = {
  type: "input",
  name: "addDepartment",
  message: `Name Department to be Added:`,
  default: null,
};

module.exports = { initialSelection, departmentOptions, addDepartment };
