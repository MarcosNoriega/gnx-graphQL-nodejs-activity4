const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const gnx = require('@simtlix/gnx');
const {Titles} = require('../models/titles');

const titleType = new GraphQLObjectType({
    name: 'Title',
    description: 'Represent title',
    fields: {
        empId: {type: GraphQLNonNull(GraphQLInt)},
        title: {type: GraphQLNonNull(GraphQLString)},
        fromDate: {type: GraphQLNonNull(GraphQLString)},
        toDate: {type: GraphQLNonNull(GraphQLString)}
    }
});

gnx.connect(Titles, titleType, 'title', 'titles');

module.exports = titleType;