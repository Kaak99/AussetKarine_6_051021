// tests (à retirer)
console.log(` --------> app.js`);


const express = require('express');
const path = require('path');//pour acces au chemin des fichiers


const userRoutes = require('./routes/user');//routes user
const sauceRoutes = require('./routes/sauce');//routes sauce (ex stuffRoutes)


//bdd
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://master:master-mdp@cluster0.vd2gi.mongodb.net/maBdd?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


// -----------route générale : ---------------//

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// bodyparser //
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// appel pour multer(chemin images) //
app.use('/images' , express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

// routes //
app.use('/api/sauces', sauceRoutes);//(ex stuffRoutes)
app.use('/api/auth', userRoutes);

module.exports = app;