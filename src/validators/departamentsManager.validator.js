const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {DeptManager} = require('../models/deptManager');

const Cant2Employee = {
    validate: async (typeName, originalObject, materializedObject) => {
        const departManagerFinded = await DeptManager.findOne({
            deptId: materializedObject.deptId,
            fromDate: materializedObject.fromDate,
            toDate: materializedObject.toDate
        });

        if (departManagerFinded) {
            throw new Cant2EmployeeUsedError(typeName);
        }
    }
}

class Cant2EmployeeUsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "Can't be two employee assigned to the same departament in the same portion of time", 'Cant2ManagerSameDepartament');
    }
};

module.exports = {Cant2Employee};