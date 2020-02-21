const Employee = require("./Employee");
class Managers extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole(){
        return"Manager";
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
module.exports = Managers;