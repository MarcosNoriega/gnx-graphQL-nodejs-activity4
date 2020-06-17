const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salariesFilds = {
    empId: Schema.Types.ObjectId,
    salary: {type: Number, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

const salariesSchema = new Schema(salariesFilds);

const Salaries = mongoose.model('Salaries', salariesSchema);

if (!Salaries.collection.collection) {
    Salaries.createCollection();
}

module.exports = {Salaries, salariesFilds};