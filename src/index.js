const express = require('express');
const app = express();
const express_graphql = require('express-graphql');
const gnx = require('@simtlix/gnx');

require('./db');

const types = require('./types');
const includedTypes = Object.values(types);

console.log(includedTypes);

const schema = gnx.createSchema(includedTypes, includedTypes);

app.use('/graphql', express_graphql({
    graphiql: true,
    schema
}));

app.listen(3000, () => console.log('app on port 3000'));