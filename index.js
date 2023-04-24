const Empolyee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./util/generateHtml")

const inquirer = require("inquirer");

const fs = require("fs");
// const util = requiire("util");
// const readFilePromise = util.promisify(fs.readFile);
// const writeFilePromise = util.promisify(fs.writeFile);

const team = [];

addManager();

// ----- Callback functions -----

// Collect manager's info from user
function addManager () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Employee id number: "
        },
        {
            type: "input",
            name: "email",
            message: "Email address: "
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office number: "
        }
    ]).then(objManager => {
        team.push(new Manager(objManager))
        askNext();
    })
};

// Ask user which action to do next
function askNext () {
    const actionArr = ["Add an Engineer", "Add an Intern", "Build the team page"];
    inquirer.prompt({
        type: "list",
        name: "action",
        choices: actionArr,
        message: "Continue adding employees to the team or finish by building the team page: "
    }).then(objNext => {
        switch (objNext.action) {
            case actionArr[0]:
                addEngineer();
                break;
            case actionArr[1]:
                addIntern(Intern)
                break;
            default:
                fs.writeFile("./dist/myteam.html", generateHTML(team), err => {
                    err ? console.log(err) : console.log("file successfully created");
                });
                break;
        };
    });
};

function addEngineer () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Employee id number: "
        },
        {
            type: "input",
            name: "email",
            message: "Email address: "
        },
        {
            type: "input",
            name: "github",
            message: "GitHub Username: "
        }
    ]).then(objEngineer => {
        team.push(new Engineer(objEngineer));
        askNext();
    })
}

function addIntern () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Employee id number: "
        },
        {
            type: "input",
            name: "email",
            message: "Email address: "
        },
        {
            type: "input",
            name: "scool",
            message: "School: "
        }
    ]).then(objIntern => {
        team.push(new Intern(objIntern));
        askNext();
    })
}



