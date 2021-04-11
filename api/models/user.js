const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const users = mongoose.Schema({
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true }
});

users.plugin(uniqueValidator);

module.exports = mongoose.model('Users', userSchema);