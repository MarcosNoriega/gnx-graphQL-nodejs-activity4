const {
  GraphQLEnumType,
} = require('graphql');

const GenderTypeEnum = new GraphQLEnumType({
  name: 'GenderTypeEnum',
  values: {
    M: {
      value: 'Masculine',
    },
    F: {
      value: 'Femenine',
    }
  },
});

module.exports = GenderTypeEnum;
