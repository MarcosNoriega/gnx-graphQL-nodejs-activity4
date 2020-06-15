const mongoose = require('mongoose');
const Schema = mongoose.Schema;

departmentsFields = {
    deptName: {type: String, required: true},
}

const departmentsSchema = new Schema(departmentsFields);

const Departments = mongoose.model("Departments", departmentsSchema);

if (!Departments.collection.collection) {
    Departments.createCollection();
}

module.exports = {Departments, departmentsFields}