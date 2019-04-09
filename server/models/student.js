const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    age: String,
    college: String
});

module.exports = mongoose.model('student', studentSchema, 'students');