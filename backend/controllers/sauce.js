// tests (à retirer)
console.log(` --------> sauce-ctrl`);

const Sauce = require('../models/Sauce');
const fs = require('fs');//package fs de node

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //let randomId = ""+ ( Math.floor(Math.random() * 999999999999999) );
  //console.log(randomId);
  const sauce = new Sauce({
    //...sauceObject, //ne passe pas
    //userId : randomId,
    userId : sauceObject.userId,
    name : sauceObject.name,
    manufacturer : sauceObject.manufacturer,
    description : sauceObject.description,
    mainPepper : sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat : sauceObject.heat,
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : []
  });
  console.log(sauce);
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json(sauce));
};


exports.getOneSauce = (req, res, next) => {
  //Sauce.findOne({_id: req.params.id})
  console.log(req.body);
  Sauce.findById(req.params.id)
  .then((sauce) => { res.status(200).json(sauce)})
  .catch((error) => {res.status(404).json({error: error})});
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauce) => { 
    res.status(200).json(sauce);
  })
  .catch((error) => {
    res.status(400).json({ error: error });
  });
};


exports.likeDislikeSauce = (req, res, next) => {
  const sauceObject = req.body.like;
  //console.log(req.body);
  //console.log(req.body.like);
  //console.log(req.req.params.id);
  //console.log(sauceObjet);
  
  // Sauce.updateOne({ _id: req.params.id },{...sauceObject,
  //     likes: sauceObject.likes,
  //     dislikes: sauceObject.dislikes,
  //     usersDisliked: sauceObject.usersDisliked,
  //     usersLiked: sauceObject.usersLiked }
  //)
  Sauce.findOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'yo'}))
  .catch(error => res.status(400).json({ error: req.body}));
};


/*

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
*/





/*note
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  =

    const thing = new Thing({
    ...req.body,
    _id: req.params.id
  });



*/