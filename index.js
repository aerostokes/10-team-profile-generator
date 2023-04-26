const Empolyee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./util/generateHtml")

const inquirer = require("inquirer");

const fs = require("fs");
// const util = require("util");
// const readFilePromise = util.promisify(fs.readFile);
// const writeFilePromise = util.promisify(fs.writeFile);

let teamNameStr = "";
const teamArr = [];

addManager();

// ----- Callback functions -----

// Collect manager's info from user
function addManager () {
    inquirer.prompt([
        {
            type: "input",
            name: "teamName",
            message: "Team Name: ",
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "name",
            message: "Manager's name: ",
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID: ",
            validate:  input => { 
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (checkExp.test(input)) { return true; 
                } else { return "Must be alphanumeric"; 
                };
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email address: ",
            validate: input => {
                const checkExp = new RegExp(/@{1}/);
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be an email address";
                };
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office phone number: "
        }
    ]).then(objManager => {
        teamNameStr = objManager.teamName;
        const {name, id, email, officeNumber} = objManager
        teamArr.push(new Manager(name, id, email, officeNumber))
        askNext();
    });
};

// Ask user which action to do next
function askNext () {
    const actionArr = ["Add an Engineer", "Add an Intern", "Preview Team Roster", "Edit Team Name", "Edit Manager", "Remove Employee", "Finish: Build the team page"];
    inquirer.prompt({
        type: "list",
        name: "action",
        choices: actionArr,
        message: "Continue updating the team or finish by building the team page: "
    }).then(objNext => {
        switch (objNext.action) {
            case actionArr[0]:
                addEngineer();
                break;
            case actionArr[1]:
                addIntern();
                break;
            case actionArr[2]:
                console.log(teamArr);
                askNext();
                break;
            case actionArr[3]:
                editTeamName();
                break;
            case actionArr[4]:
                editManager();
                break;
            case actionArr[5]:
                removeEmployee();
                break;
            default:
                createFile();
                break;
        };
    });
};

function addEngineer () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer's name: ",
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID: ",
            validate:  input => { 
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (checkExp.test(input)) { return true; 
                } else { return "Must be alphanumeric"; 
                };
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email address: ",
            validate: input => {
                const checkExp = new RegExp(/@{1}/);
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be an email address";
                };
            }
        },
        {
            type: "input",
            name: "github",
            message: "GitHub Username: ",
            validate: input => {
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be alphanumeric";
                };
            }
        }
    ]).then(objEngineer => {
        const {name, id, email, github} = objEngineer
        teamArr.push(new Engineer(name, id, email, github));
        askNext();
    });
};

function addIntern () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern's name: ",
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID: ",
            validate:  input => { 
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (checkExp.test(input)) { return true; 
                } else { return "Must be alphanumeric"; 
                };
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email address: ",
            validate: input => {
                const checkExp = new RegExp(/@{1}/);
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be an email address";
                };
            }
        },
        {
            type: "input",
            name: "school",
            message: "School: "
        }
    ]).then(objIntern => {
        const {name, id, email, school} = objIntern
        teamArr.push(new Intern(name, id, email, school));
        askNext();
    });
};

function editTeamName () {
    inquirer.prompt({
        type: "input",
        name: "teamName",
        message: "Team Name: ",
        validate: input => (input !== "")
    }).then(objTeam => {
        teamNameStr = objTeam.teamName;
        askNext();
    });
};

function editManager () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager's name: ",
            default: teamArr[0].name,
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID: ",
            default: teamArr[0].id,
            validate:  input => { 
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (checkExp.test(input)) { return true; 
                } else { return "Must be alphanumeric"; 
                };
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email address: ",
            default: teamArr[0].email,
            validate: input => {
                const checkExp = new RegExp(/@{1}/);
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be an email address";
                };
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office phone number: ",
            default: teamArr[0].officeNumber,
        }
    ]).then(objManager => {
        const {name, id, email, officeNumber} = objManager
        for (const key in objManager) {
            teamArr[0][key] = objManager.key;
            // if (Object.hasOwnProperty.call(object, key)) {
            //     const element = object[key];
                
            // }
        }
        teamArr.splice(0, 1, new Manager(name, id, email, officeNumber))
        askNext();
    });
};

function removeEmployee () {
    const choiceArr = ["Cancel"].concat(teamArr.slice(1).map(employee => {
        return `${employee.name} (${employee.getRole()})`;
    }));
    inquirer.prompt({
        type: "list",
        name: "choice",
        choices: choiceArr
    }).then(objResponse => {
        if (objResponse.choice !== "Cancel") {
            const index = choiceArr.findIndex(employee => employee == objResponse.choice);
            teamArr.splice(index, 1);
        }
        askNext();
    })
}

function createFile() {
    const teamFile = `./dist/${encodeURIComponent(teamNameStr).toLowerCase()}.html`;
    fs.readFile(teamFile, (err, data) => {
        if (err) {
            fs.writeFile(teamFile, generateHTML(teamArr, teamNameStr), err => {
                err ? console.log(err) : console.log(`Successfully created ${teamFile}`);
            })
        } else {
            inquirer.prompt({
                type: "list",
                name:"overwrite",
                message: `${teamFile} already exists. Would you like to change to a unique Team Name or overwrite the existing file?`,
                choices: ["Edit Team Name", `Overwrite ${teamFile}`]
            }).then(objResponse => {
                if (objResponse.overwrite === "Edit Team Name") { 
                    return editTeamName(); 
                } else {
                    fs.writeFile(teamFile, generateHTML(teamArr, teamNameStr), err => {
                        err ? console.log(err) : console.log(`Successfully created ${teamFile}`);
                    });
                };
            });
        };
    });
}