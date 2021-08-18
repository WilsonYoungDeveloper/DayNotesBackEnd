const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://root:senha@123456@daynotes.ujbtl.mongodb.net/annotations?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;