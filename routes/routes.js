const express = require('express');

const app = express.Router();
const repository = require('../repositories/userRepository');

// get all User items in the db
app.get('/', (req, res) => {
  repository.findAll().then((Users) => {
    res.render('viewUsers', {Users});
    console.log('Users: ' + Users);
  }).catch((error) => console.log(error));
});

// add a User item
app.post('/', (req, res) => {
  const { first, last, email, age } = req.body;
  repository.create(first, last, email, age).then((User) => {
    res.json(User);
  }).catch((error) => console.log(error));
});


module.exports = app;