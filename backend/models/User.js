const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true},
  password: { type: String, required: true, minLength:6, maxLength:1024 }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);