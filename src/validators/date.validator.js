const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const DateValidator = {
    validate: async (typeName, originalObject, materializedObject) => {
        const FromDate = new Date(materializedObject.fromDate);
        const ToDate = new Date(materializedObject.toDate);

        if (FromDate > ToDate) {
            throw new DateValidatorUsedError(typeName);
        }
    }
}

class DateValidatorUsedError extends GNXError{
    constructor(typeName) {
        super(typeName, "fromDate must be smaller than toDate", 'DateValidator');
    }
}

module.exports = DateValidator;



