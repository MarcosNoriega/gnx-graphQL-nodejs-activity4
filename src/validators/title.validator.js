const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Titles} = require('../models/titles');

const CantRepeatTitle = {
    validate: async (typeName, originalObject, materializedObject) => {
        const titleFinded = await Titles.findOne(materializedObject);

        if (titleFinded) {
            throw new CantRepeatTitleError(typeName);
        }
    }
};
class CantRepeatTitleError extends GNXError {
    constructor(typeName) {
        super(typeName, "The same employee cannot have 2 titles with the same dept_name", 'CantRepeatDNI');
    }
};

module.exports = {CantRepeatTitle};