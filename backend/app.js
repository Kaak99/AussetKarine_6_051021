const express = require('express');

const app = express();

app.use((req,res,next) => {
  res.status(201);
  next();
})


app.use((req,res, next) => {
  res.json({ message : 'requete recue'});
  //next();
})


module.exports = app;