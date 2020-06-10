const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017, localhost:27018, localhost:27019/example', {replicaSet: 'rs'});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});