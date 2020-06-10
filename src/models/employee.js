const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeFields = {
    dni: {type: Number, required: true},
    birthDate: {type: Date, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, required: true},
    hireDate: {type: String, required: true}
};

const employeeSchema = new Schema(employeeFields);

const Employee = mongoose.model('Employee', employeeSchema);

if (!Employee.collection.collection) {
    Employee.createCollection();
}

module.exports = {Employee, employeeFields};