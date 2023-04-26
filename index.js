const Empolyee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./util/generateHtml")

const inquirer = require("inquirer");
const fs = require("fs");

let teamNameStr = "";
const teamArr = [];

// On application start:
addManager();


// ----- Callback functions -----

// Collect team name and manager's info from user and add it to teamArr
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
            message: "Manager's Name: ",
            validate: input => (input !== "")
        },
        {
            type: "input",
            name: "id",
            message: "Manager's Employee ID: ",
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
            message: "Manager's Email: ",
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
            message: "Manager's Office Number: "
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
    const actionArr = ["Add an Engineer", "Add an Intern", "Preview Team Roster", "Edit Team Name", "Edit Manager", "Remove Employee", "Finish: Build the Team Page"];
    inquirer.prompt({
        type: "list",
        name: "action",
        choices: actionArr,
        message: "Select Next Action: "
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


// Collect engineer's info from user and add it to teamArr
function addEngineer () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer's Name: ",
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
            message: "Email: ",
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

// Collect intern's info from user and add it to teamArr
function addIntern () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern's Name: ",
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
            message: "Email: ",
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

// Collect an updated team name from user
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

// Collect updated manager's info from user and edit the manager's object in teamArr
function editManager () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager's Name: ",
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
            message: "Email: ",
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
            message: "Office Number: ",
            default: teamArr[0].officeNumber,
        }
    ]).then(objManager => {
        for (const key in objManager) {
            teamArr[0][key] = objManager[key];
        }
        askNext();
    });
};

// Show user list of current (non-manager) employee and delete the user's selection (or do nothing if user selects "Cancel")
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

// Call generateHTML and write to local folder "/dist". If the file already exists, ask user whether to overwrite the existing file or to change the team name to create a unique file name.
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
                message: `${teamFile} already exists. Would you like to change to a unique team name or overwrite the existing file?`,
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