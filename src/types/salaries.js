const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLFloat,
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const {
    DateValidator
} = require('../validators/date.validator');

const gnx = require('@simtlix/gnx');
const {Salaries} = require('../models/salaries');
const employeeType = require('./employee');
const {Employee} = require('../models/employee');

const salariesType = new GraphQLObjectType({
    name: 'Salaries',
    description: 'Represent salaries',
    extensions: {
        validations: {
            'CREATE':
            [
                DateValidator
            ]
        }
    },
    fields: {
        salary: {type: GraphQLNonNull(GraphQLFloat)},
        fromDate: {type: GraphQLNonNull(GraphQLDateTime)},
        toDate: {type: GraphQLNonNull(GraphQLDateTime)},
        employee: {
            type: employeeType,
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empId'
                }
            },
            resolve: (parent, args) => {
                return Employee.findById(parent.empId);
            }
        }
    }
});

gnx.connect(Salaries, salariesType, 'salarie', 'salaries');

module.exports = salariesType;