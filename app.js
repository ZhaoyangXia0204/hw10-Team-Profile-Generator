const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

var employee = [];

function questions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "theName",
            message: "Employee's name: ",
        },
        {
            type: "input",
            name: "employeeID",
            message: "Employee's ID: ",
        },
        {
            type: "input",
            name: "employeeEmail",
            message: "Employee's Emall: "
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What is the role of this employee?",
            choices: ["Manager", "Engineer", "Intern"],
        },
        {
            type: "input",
            name: "officeNumber",
            message: "officeNumber: ",
            when: function (answers) {
                return answers["employeeRole"] === "Manager"
            }
        },
        {
            type: "input",
            name: "gitHub",
            message: "GitHub account id",
            when: function (answers) {
                return answers["employeeRole"] === "Engineer"
            }
        },
        {
            type: "input",
            name: "school",
            message: "School: ",
            when: function (answers) {
                return answers["employeeRole"] === "Intern"
            }
        },
        {
            type: "confirm",
            name: "oneMore",
            message: "Would you like to add another employee?"
        }
    ]).then(function (answers) {
        if (answers.employeeRole === 'Manager') {
            let nM = new Manager(answers.theName, answers.employeeID, answers.employeeEmail, answers.officeNumber)
            nM.title = nM.getRole()
            employee.push(nM);
        } else if (answers.employeeRole === 'Engineer') {
            let nE = new Engineer(answers.theName, answers.employeeID, answers.employeeEmail, answers.gitHub)
            nE.title = nE.getRole()
            employee.push(nE);
        } else {
            let nI = new Intern(answers.theName, answers.employeeID, answers.employeeEmail, answers.school)
            nI.title = nI.getRole()
            employee.push(nI);
        }
    
        if (answers.oneMore === true) {
            return questions()
        }
       
      
    console.log(employee)
    
    
        
    
        fs.writeFileSync("./outputs/team.html", render(employee), function (err) {
            if (err) {
                return console.log("failed")
            }
    
        })
    
    })

}


questions();


