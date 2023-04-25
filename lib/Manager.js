// Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee{
    constructor({teamName, name, id, email, officeNumber}) {
        super(name, id, email);
        this.teamName = teamName;
        this. officeNumber = officeNumber;
    }
    getTeamName() {
        return this.teamName;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;