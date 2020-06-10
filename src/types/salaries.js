const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql');
const gnx = require('@simtlix/gnx');
const {Salaries} = require('../models/salaries');

const salariesType = new GraphQLObjectType({
    name: 'Salaries',
    description: 'Represent salaries',
    fields: {
        empId: {type: GraphQLNonNull(GraphQLInt)},
        salary: {type: GraphQLNonNull(GraphQLFloat)},
        fromDate: {type: GraphQLNonNull(GraphQLString)},
        toDate: {type: GraphQLNonNull(GraphQLString)}
    }
});

gnx.connect(Salaries, salariesType, 'salarie', 'salaries');

module.exports = salariesType;