const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString
} = require('graphql');
const {
    GraphQLDateTime
} = require('graphql-iso-date');

const AuditableObjectFields = {
    'createdAt': {
        type: GraphQLDateTime,
        description: 'Creation date',
        extensions: {
            readOnly: true,
        }
    },
    'updateAt': {
        type: GraphQLDateTime,
        description: 'Last edited date',
        extensions: {
            readOnly: true
        }
    }
}

module.exports = {AuditableObjectFields};
  