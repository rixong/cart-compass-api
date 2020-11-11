const express = require('express');

const { defaultCategories } = require('../models/category');
const User = require('../models/user');
const auth = require('../middleware/authentication');

const router = new express.Router();

// New User

router.post('/users', async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.send('Passwords don\'t match. Please try again.');
  }
  const user = new User(req.body);
  user.categories.push(...defaultCategories);
  try {
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send('*Something went wrong');
  }
});

// Logon

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send('oops.');
  }
});

// router.post('/profile', async (req, res) => {

//   try {
//     User.findOne(tokens.token: req.body.token)
//   } catch (error) {

//   }
// })

// All Users
router.get('/users', auth, async (req, res) => {
  try {
    console.log(req.user.name);
    const users = await User.find();
    const names = users.map((user) => user.name);
    res.status(200).send(names);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
