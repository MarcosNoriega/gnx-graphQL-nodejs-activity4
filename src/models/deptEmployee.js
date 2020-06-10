const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmployeeFields = {
    empId: {type: Number, required: true},
    deptId: {type: Number, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

const deptEmployeeSchema = new Schema(deptEmployeeFields);

const DeptEmployee = mongoose.model("DeptEmployee", deptEmployeeSchema);

if (!DeptEmployee.collection.collection) {
    DeptEmployee.createCollection();
}

module.exports = {DeptEmployee, deptEmployeeFields};