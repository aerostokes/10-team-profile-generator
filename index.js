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
            validate:  input => { 
                const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
                if (checkExp.test(input)) { return true; 
                } else { return "Must be alphanumeric"; 
                };
            }
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
            message: "Office phone number: ",
            validate: input => {
                const checkExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
                // Citation: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be a phone number. ex: 123-456-7890";
                };
            }
        }
    ]).then(objManager => {
        teamArr.push(new Manager(objManager))
        askNext();
    });
};

// Ask user which action to do next
function askNext () {
    const actionArr = ["Add an Engineer", "Add an Intern", "Edit Team Name", "Edit Manager", "Remove Employee", "Build the team page"];
    inquirer.prompt({
        type: "list",
        name: "action",
        choices: actionArr,
        message: "Continue updating the team or finish and building the team page: "
    }).then(objNext => {
        switch (objNext.action) {
            case actionArr[0]:
                addEngineer();
                break;
            case actionArr[1]:
                addIntern();
                break;
            case actionArr[2]:
                editTeamName();
                break;
            case actionArr[3]:
                editManager();
                break;
            case actionArr[4]:
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
        teamArr.push(new Engineer(objEngineer));
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
        teamArr.push(new Intern(objIntern));
        askNext();
    });
};

function editTeamName () {
    inquirer.prompt({
        type: "input",
        name: "teamName",
        message: "Team Name: ",
        validate:  input => { 
            const checkExp = new RegExp(/^[a-zA-Z0-9]+$/);
            if (checkExp.test(input)) { return true; 
            } else { return "Must be alphanumeric"; 
            };
        }
    }).then(objTeam => {
        teamArr[0].teamName = objTeam.teamName;
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
            validate: input => {
                const checkExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
                // Citation: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
                if (input === "" || checkExp.test(input)) { return true;
                } else { return "Must be a phone number. ex: 123-456-7890";
                };
            }
        }
    ]).then(objManager => {
        teamArr[0].name = objManager.name;
        teamArr[0].id = objManager.id;
        teamArr[0].email = objManager.email;
        teamArr[0].officeNumber = objManager.officeNumber;
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
    const teamFile = `./dist/${teamArr[0].teamName}.html`;
    fs.readFile(teamFile, (err, data) => {
        if (err) {
            fs.writeFile(teamFile, generateHTML(teamArr), err => {
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
                    editTeamName(); 
                } else {
                    fs.writeFile(teamFile, generateHTML(teamArr), err => {
                        err ? console.log(err) : console.log(`Successfully created ${teamFile}`);
                    });
                };
            });
        };
    });
}