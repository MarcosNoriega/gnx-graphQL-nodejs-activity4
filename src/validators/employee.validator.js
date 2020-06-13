const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Employee} = require('../models/employee');

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
        dateReceived = new Date(materializedObject.birthDate);

        if (Date.now.getYear() - dateRecived.getYear() < 18){
            throw new MustHaveMoreThan18UsedError(typeName);

        }
    }
}

class MustHaveMoreThan18UsedError extends GNXError {
    constructor(typeName) {
        super(typeName, "Employee must have more than 18 years old", 'MustHaveMoreThan18');
    }
};

module.exports = {CantRepeatDNI, MustHaveMoreThan18}
