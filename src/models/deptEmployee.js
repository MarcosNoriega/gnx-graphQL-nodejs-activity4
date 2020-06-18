const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmployeeFields = {
    empId: Schema.Types.ObjectId,
    deptId: Schema.Types.ObjectId,
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

const deptEmployeeSchema = new Schema(deptEmployeeFields);

const DeptEmployee = mongoose.model("DeptEmployee", deptEmployeeSchema);

if (!DeptEmployee.collection.collection) {
    DeptEmployee.createCollection();
}

module.exports = {DeptEmployee, deptEmployeeFields};