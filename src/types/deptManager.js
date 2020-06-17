const {
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const {
    DateValidator
} = require('../validators/date.validator');

const {
    Cant2Employee
} = require('../validators/departamentsManager.validator');

const employeeType = require('./employee');
const departmentsType = require('./departments');
const {Employee} = require('../models/employee');
const {Departments} = require('../models/departments');
const gnx = require('@simtlix/gnx');
const {DeptManager} = require('../models/deptManager');

const deptManagerType = new GraphQLObjectType({
   name: 'deptManager',
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
        resolve (parent, args) {
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
        resolve (parent, args) {
             return Departments.findById(parent.deptId)
        }
    }
   } 
});

gnx.connect(DeptManager, deptManagerType, 'deptManager', 'deptsManager');

module.exports = deptManagerType;