const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const {AuditableObjectFields} = require('./extendedTypes/auditableGraphqlObjectType');

const {
    CantRepeatDNI,
    MustHaveMoreThan18,
    CantDeleteEmployeeWithSalaries,
    CantDeleteEmployeeWithDepartment
} = require('../validators/employee.validator');

const GenderTypeEnum = require('./enums/gender.enum');

const gnx = require('@simtlix/gnx');
const {Employee} = require('../models/employee');

const {Salaries} = require('../models/salaries');
const {Titles} = require('../models/titles');
const {DeptEmployee} = require('../models/deptEmployee');
const {DeptManager} = require('../models/deptManager');


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
          'UPDATE':
          [
            CantRepeatDNI,
            MustHaveMoreThan18
          ],
          'DELETE':
          [
            CantDeleteEmployeeWithSalaries,
            CantDeleteEmployeeWithDepartment
          ],
        },
      },
    fields: () => Object.assign(AuditableObjectFields, {
        dni: {type: GraphQLNonNull(GraphQLInt)},
        birthDate: {type: GraphQLNonNull(GraphQLDateTime)},
        firstName: {type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        gender: {type: GraphQLNonNull(GenderTypeEnum)},
        hireDate: {type: GraphQLNonNull(GraphQLDateTime)},
        salaries: {
            type: new GraphQLList(salariesType),
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empId',
                },
            },
            resolve: (parent, args) => {
                return Salaries.find({'empId': parent.id});
            },
        },
        title: {
            type: new GraphQLList(titleType),
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empId',
                },
            },
            resolve: (parent, args) => {
                return Titles.find({'empId': parent.id});
            },
        },
        deptEmployee: {
            type: new GraphQLList(deptEmployeeType),
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empId',
                },
            },
            resolve: (parent, args) => {
                return DeptEmployee.find({'empId': parent.id});
            },
        },
        deptManager: {
            type: new GraphQLList(deptManagerType),
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empId',
                },
            },
            resolve: (parent, args) => {
                return DeptManager.find({'empId': parent.id});
            },
        }
    })
});

gnx.connect(Employee, employeeType, 'employee', 'employees')

module.exports = employeeType;

const salariesType = require('./salaries');
const titleType = require('./titles');
const deptEmployeeType = require('./deptEmployee');
const deptManagerType = require('./deptManager');

