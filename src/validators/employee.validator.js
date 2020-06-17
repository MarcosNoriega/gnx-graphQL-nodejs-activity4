const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Employee} = require('../models/employee');
const {Salaries} = require('../models/salaries');
const {DeptEmployee} = require('../models/deptEmployee');

const CantRepeatDNI = {
    validate: async (typeName, originalObject, materializedObject) => {
        const employeeFinded = await Employee.findOne({ 'dni': materializedObject.dni });

        if (employeeFinded) {
            throw new CantRepeatDNIUsedError(typeName);
        }
    }
};
class CantRepeatDNIUsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "DNI can't be repeated", 'CantRepeatDNI');
    }
};

const MustHaveMoreThan18 = {
    validate: async (typeName, originalObject, materializedObject) => {
        let dateReceived = new Date(materializedObject.birthDate);
        let currelyDate = new Date();

        if (currelyDate.getYear() - dateReceived.getYear() < 18){
            throw new MustHaveMoreThan18UsedError(typeName);
        }
    }
}

class MustHaveMoreThan18UsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "Employee must have more than 18 years old", 'MustHaveMoreThan18');
    }
};

const CantDeleteEmployeeWithSalaries = {
    validate: async (typeName, originalObject, materializedObject) => {
        const salariesFinded = await Salaries.findOne({ 'empId':  originalObject});

        if (salariesFinded) {
            throw new CantDeleteEmployeeWithSalariesError(typeName);
        }
    }
}

class CantDeleteEmployeeWithSalariesError extends GNXError {
    constructor(typeName) {
        super(typeName, "Employee have at least 1 salarie related", 'CantDeleteEmployeeWithSalarie');
    }
};

const CantDeleteEmployeeWithDepartment = {
    validate: async (typeName, originalObject, materializedObject) => {
        const deptEmployeeFinded = await DeptEmployee.findOne({ 'empId':  originalObject});

        if (deptEmployeeFinded) {
            throw new CantDeleteEmployeeWithDeptEmployeeError(typeName);
        }
    }
}


class CantDeleteEmployeeWithDeptEmployeeError extends GNXError {
    constructor(typeName) {
        super(typeName, "Employee have at least 1 DeptEmployee related", 'CantDeleteEmployeeWithSalarie');
    }
};

module.exports = {CantRepeatDNI, MustHaveMoreThan18, CantDeleteEmployeeWithSalaries, CantDeleteEmployeeWithDepartment}
