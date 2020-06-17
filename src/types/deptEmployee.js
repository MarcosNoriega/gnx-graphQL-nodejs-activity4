const {
    GraphQLObjectType,
    GraphQLNonNull,
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const {
    DateValidator
} = require('../validators/date.validator');

const departmentsType = require('./departments');
const employeeType = require('./employee');
const {Employee} = require('../models/employee');
const {Departments} = require('../models/departments');
const {DeptEmployee} = require('../models/deptEmployee');
const gnx = require('@simtlix/gnx');

const {
    Cant2Employee
} = require('../validators/departamentsEmployee.validator');

const deptEmployeeType = new GraphQLObjectType({
   name: 'deptEmployee',
   description: '',
   extensions: {
        validations:{
            'CREATE':
            [
                Cant2Employee,
                DateValidator
            ]
        }
   },
   fields: {
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
            return Employee.findById(parent.empId)
        }
    },
    departments: {
        type: departmentsType,
        extensions: {
            relation: {
                 embedded: false,
                 connectionField: 'deptId'
            }
        },
        resolve: (parent, args) => {
             return Departments.findById(parent.deptId)
        }
    }
   }
   
});

gnx.connect(DeptEmployee, deptEmployeeType, 'deptEmployee', 'deptsEmployee');

module.exports = deptEmployeeType;
