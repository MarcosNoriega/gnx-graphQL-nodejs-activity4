const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const {
    CantRepeatDNI,
    MustHaveMoreThan18
} = require('../validators/employee.validator');

const gnx = require('@simtlix/gnx');
const {Employee} = require('../models/employee');

const employeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Represent employee',
    extensions: {
        validations: {
          'CREATE':
          [
            CantRepeatDNI,
            MustHaveMoreThan18
          ],
        },
      },

    fields: {
        dni: {type: GraphQLNonNull(GraphQLInt)},
        birthDate: {type: GraphQLNonNull(GraphQLDateTime)},
        firstName: {type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        gender: {type: GraphQLNonNull(GraphQLString)},
        hireDate: {type: GraphQLNonNull(GraphQLDateTime)},
    }
});

gnx.connect(Employee, employeeType, 'employee', 'employees')

module.exports = employeeType;

