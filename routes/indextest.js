// Import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');

// Create connection to database
const dbConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
  });
  return connection;
};

// Prompt user for action to perform
const promptUser = () => {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        process.exit();
      default:
        break;
    }
  });
};

// View all departments
const viewAllDepartments = async () => {
  const connection = await dbConnection();
  const [rows, fields] = await connection.execute('SELECT * FROM department');
  console.table(rows);
  connection.end();
  promptUser();
};

// View all roles
const viewAllRoles = async () => {
  const connection = await dbConnection();
  const [rows, fields] = await connection.execute('SELECT * FROM role');
  console.table(rows);
  connection.end();
  promptUser();
};

// View all employees
const viewAllEmployees = async () => {
  const connection = await dbConnection();
  const [rows, fields] = await connection.execute('SELECT * FROM employee');
  console.table(rows);
  connection.end();
  promptUser();
};

// Add a department
const addDepartment = async () => {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is the name of the new department?'
  });
  const connection = await dbConnection();
  const [rows, fields] = await connection.execute('INSERT INTO department (name) VALUES (?)', [answer.name]);
  console.log(`Added ${answer.name} to department list.`);
  connection.end();
  promptUser();
};

// Add a role
const addRole = async () => {
  const connection = await dbConnection();
  const [departments, fields] = await connection.execute('SELECT * FROM department');
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const answer = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the title of the new role?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of the new role?'
    },
    {
      name: 'department_id',
      type: 'list',
      message: 'Which department does the new
