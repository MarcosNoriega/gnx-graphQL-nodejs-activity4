const mongoose = require('mongoose');
const Schema = mongoose.Schema;

deptManagerFields = {
    empId: {type: Number, required: true},
    deptId: {type: Number, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

deptManagerSchema = new Schema(deptManagerFields);

const DeptManager = mongoose.model('DeptManager', deptManagerSchema);

if (!DeptManager.collection.collection) {
    DeptManager.createCollection();
}

module.exports = {DeptManager, deptManagerFields};