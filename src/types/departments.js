const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const gnx = require('@simtlix/gnx');
const {Departments} = require('../models/departments');

const departmentsType = new GraphQLObjectType({
    name: 'Departments',
    description: 'Represent departments',
    fields: {
        deptName: {type: GraphQLNonNull(GraphQLString)}
    }
});

gnx.connect(Departments, departmentsType, 'department', 'departments');

module.exports = departmentsType;