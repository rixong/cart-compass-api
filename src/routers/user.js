const express = require('express');

const { defaultCategories } = require('../models/category');
const User = require('../models/user');

const router = new express.Router();

// New User

router.post('/users', async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.send('Passwords don\'t match. Please try again.');
  }
  const user = new User(req.body);
  user.categories.push(...defaultCategories);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).send(user, token);
  } catch (error) {
    res.status(400).send('*Something went wrong');
  }
});

// Logon

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = user.generateAuthToken();
    res.send(user, token);
  } catch (error) {
    res.status(400).send('oops.');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const names = users.map((user) => user.name);
    res.status(200).send(names);
  } catch (error) {
    res.status(400).send('Something went wrong', error);
  }
});

module.exports = router;
