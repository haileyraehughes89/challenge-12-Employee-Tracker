console.log(`something happening...`);
const {
  buildConnectionOptions,
  createConnection,
} = require(`./config/dbConfig`);

const inquirer = require("inquirer");

async function main() {
  const connection = await createConnection(buildConnectionOptions());

  const { createPromptModule } = inquirer;
  const prompt = createPromptModule();

  const selectedOption = await prompt([
    {
      type: "list",
      name: "menuOption",
      choices: ["Get All Departments", "Create a department"],
    },
  ]);

  console.log(selectedOption);
  const [departments] = await connection.execute(
    "SELECT * FROM departments;",
    []
  );
  console.table(departments);
}

main();
