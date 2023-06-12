const tableOptions = {
  type: "list",
  name: "tableList",
  choices: ["Departments", "Roles", "Employees"],
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

module.exports = { tableOptions, departmentOptions, addDepartment };
