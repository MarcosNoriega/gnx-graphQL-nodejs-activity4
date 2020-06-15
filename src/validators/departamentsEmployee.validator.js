const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {DeptEmployee} = require('../models/deptEmployee');

const Cant2Employee = {
    validate: async (typeName, originalObject, materializedObject) => {
        const departEmployeeFinded = await DeptEmployee.findOne({
            deptId: materializedObject.deptId,
            fromDate: materializedObject.fromDate,
            toDate: materializedObject.toDate
        });

        if (departEmployeeFinded) {
            throw new Cant2EmployeeUsedError(typeName);
        }
    }
}

class Cant2EmployeeUsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "Can't be two employee assigned to the same departament in the same portion of time", 'Cant2EmployeeSameDepartament');
    }
};

module.exports = {Cant2Employee};