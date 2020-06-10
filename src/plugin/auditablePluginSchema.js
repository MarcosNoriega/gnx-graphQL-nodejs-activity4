module.exports = (schema, options) => {
    schema.add({updatedAt: {type: Date}});
    schema.add({createAt: {type: Date}});

    schema.set('timestamps', true);
};