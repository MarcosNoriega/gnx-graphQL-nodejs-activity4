const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Departments} = require('../models/departments');

const CantRepeatName = {
    validate: async (typeName, originalObject, materializedObject) => {
        const deptFinded = await Departments.findOne({'deptName': materializedObject.deptName});

        if (deptFinded) {
            throw new CantRepeatNameUsedError(typeName);
        }
    }
};

class CantRepeatNameUsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "Can't be two departments with the same Deptname", 'CantRepeatDeptName');
    }
};

module.exports = {CantRepeatName};