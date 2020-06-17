const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const gnx = require('@simtlix/gnx');
const {Titles} = require('../models/titles');
const employeeType = require('./employee');
const {Employee} = require('../models/employee');

const {
    CantRepeatTitle
} = require('../validators/title.validator');

const titleType = new GraphQLObjectType({
    name: 'Title',
    description: 'Represent title',
    extensions: {
        validations: {
            'CREATE': 
            [
                CantRepeatTitle
            ]
        }
    },
    fields: {
        title: {type: GraphQLNonNull(GraphQLString)},
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

gnx.connect(Titles, titleType, 'title', 'titles');

module.exports = titleType;