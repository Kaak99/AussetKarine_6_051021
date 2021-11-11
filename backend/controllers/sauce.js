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
  //delete sauceObject._id;
  let randomId = ""+ ( Math.floor(Math.random() * 999999999999999) );
  console.log("randomId");
  console.log(randomId);
  const sauce = new Sauce({
    //...sauceObject, 
    //userId : randomId,
    userId : sauceObject.userId,
    name : sauceObject.name,
    manufacturer : sauceObject.manufacturer,
    description : sauceObject.description,
    mainPepper : sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat : sauceObject.heat,
    likes : 10,
    dislikes : 1,
    usersLiked : [],
    usersDisliked : []
  });
  console.log(sauce);
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json(sauce));
};

/*
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //delete thingObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
*/



exports.getOneSauce = (req, res, next) => {
  //Sauce.findOne({_id: req.params.id})
  Sauce.findById(req.params.id)
  .then((sauce) => { res.status(200).json(sauce)})
  .catch((error) => {res.status(404).json({error: error})});
};

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

/*
exports.deleteSauce = (req, res, next) => {

  Sauce.deleteOne({ _id: req.params.id })
    //.then(sauce => res.status(200).json(sauce))
    .then(sauce => res.status(200).json({message : 'sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
};
*/

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