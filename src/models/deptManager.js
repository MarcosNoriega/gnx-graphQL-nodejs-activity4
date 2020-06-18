const mongoose = require('mongoose');
const Schema = mongoose.Schema;

deptManagerFields = {
    empId: Schema.Types.ObjectId,
    deptId: Schema.Types.ObjectId,
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

deptManagerSchema = new Schema(deptManagerFields);

const DeptManager = mongoose.model('DeptManager', deptManagerSchema);

if (!DeptManager.collection.collection) {
    DeptManager.createCollection();
}

module.exports = {DeptManager, deptManagerFields};