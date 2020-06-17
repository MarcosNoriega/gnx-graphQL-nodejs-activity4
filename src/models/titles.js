const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleFields = {
    empId: Schema.Types.ObjectId,
    title: {type: String, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true}
}

const titlesSchema = new Schema(titleFields);

const Titles = mongoose.model("Titles", titlesSchema);

if (!Titles.collection.collection) {
    Titles.createCollection();
}

module.exports = {Titles, titleFields};

