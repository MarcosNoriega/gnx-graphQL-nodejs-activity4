const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const gnx = require('@simtlix/gnx');
const {Departments} = require('../models/departments');
const {
    CantRepeatName, 
    CantDeleteDepartamentWithDeptEmp, 
    CantDeleteDEpartamentWithDeptMngError
} = require('../validators/departments.validator');

const departmentsType = new GraphQLObjectType({
    name: 'Departments',
    description: 'Represent departments',
    extensions: {
        validations: {
            'CREATE':
            [
                CantRepeatName
            ],
            'DELETE':
            [
                CantDeleteDepartamentWithDeptEmp,
                CantDeleteDEpartamentWithDeptMngError
            ]
        }
    },
    fields: {
        deptName: {type: GraphQLNonNull(GraphQLString)}
    }
});

gnx.connect(Departments, departmentsType, 'department', 'departments');

module.exports = departmentsType;