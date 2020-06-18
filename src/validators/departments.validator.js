const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Departments} = require('../models/departments');
const {DeptEmployee} = require('../models/deptEmployee');
const {DeptManager} = require('../models/deptManager');

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

const CantDeleteDepartamentWithDeptEmp = {
    validate: async (typeName, originalObject, materializedObject) => {
        const deptEmployeeFinded = await DeptEmployee.findOne({ 'deptId':  originalObject});

        if (deptEmployeeFinded) {
            throw new CantDeleteDepartamentWithDeptEmpError(typeName);
        }
    }
}

class CantDeleteDepartamentWithDeptEmpError extends GNXError {
    constructor(typeName) {
        super(typeName, "Departament have at least 1 DeptEmployee related", 'CantDeleteDEpartamentWithSalarie');
    }
};

const CantDeleteDepartamentWithDeptMng = {
    validate: async (typeName, originalObject, materializedObject) => {
        const deptManagerFinded = await DeptManager.findOne({'deptId': originalObject});

        if (deptManagerFinded) {
            throw new CantDeleteDepartamentWithDeptMngError(typeName);
        }
    }
}

class CantDeleteDepartamentWithDeptMngError extends GNXError {
    constructor(typeName) {
        super(typeName, "Departament have at least 1 DeptManager related", 'CantDeleteDEpartamentWithSalarie');
    }
};

module.exports = {CantRepeatName, CantDeleteDepartamentWithDeptEmp, CantDeleteDepartamentWithDeptMng};