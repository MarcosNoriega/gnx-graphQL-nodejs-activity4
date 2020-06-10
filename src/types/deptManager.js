const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const employeeType = require('./employee');
const departmentsType = require('./departments');
const {Employee} = require('../models/employee');
const {Departments} = require('../models/departments');
const gnx = require('@simtlix/gnx');
const {DeptManager} = require('../models/deptManager');

const deptManagerType = new GraphQLObjectType({
   name: 'deptManager',
   description: '',
   fields: {
    empId: {type: GraphQLNonNull(GraphQLString)},
    deptId: {type: GraphQLNonNull(GraphQLString)},
    fromDate: {type: GraphQLNonNull(GraphQLString)},
    toDate: {type: GraphQLNonNull(GraphQLString)},
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