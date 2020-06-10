const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const gnx = require('@simtlix/gnx');
const {Employee} = require('../models/employee');

const employeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Represent employee',
    fields: {
        dni: {type: GraphQLNonNull(GraphQLInt)},
        birthDate: {type: GraphQLNonNull(GraphQLString)},
        firstName: {type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        gender: {type: GraphQLNonNull(GraphQLString)},
        hireDate: {type: GraphQLNonNull(GraphQLString)}
    }
});

gnx.connect(Employee, employeeType, 'employee', 'employees')

module.exports = employeeType;

