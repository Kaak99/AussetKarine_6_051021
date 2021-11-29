// tests (à retirer)
console.log(` --------> Modele:User`);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//necessaire pour un seul email


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength:1024,
    minlength: [10, "minimum 10 caracteres"]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "minimum 8 caracteres"],
    maxlength:1024
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

//( {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false})

