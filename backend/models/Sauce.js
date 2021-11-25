// tests (à retirer)
console.log(` --------> Modele:Sauce`);


const mongoose = require('mongoose');

//------schémas pour les sauces-----//
const sauceSchema = mongoose.Schema({
  userId : { type: String, required: true },
  name : { type: String, required: true, maxLength:20 },
  manufacturer : {type: String, required: true, maxLength:30},
  description : {type: String, required: true, maxLength:250},
  mainPepper : {type: String, required: true, maxLength:15},
  imageUrl : {type: String, required: true},
  heat : {type: Number, required: true, min:1, max:10},
  likes : {type: Number, required: true, default:0},
  dislikes : {type: Number, required: true, default:0},
  usersLiked : {type: Array, required: true, default:[]},
  usersDisliked : {type: Array, required: true, default:[]},
});

module.exports = mongoose.model('Sauce', sauceSchema);