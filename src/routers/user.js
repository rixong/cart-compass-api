const express = require('express');
const jwt = require('jsonwebtoken');

const { defaultCategories } = require('../models/category');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    return res.send('Passwords don\'t match. Please try again.');
  }
  const user = new User(req.body);
  const token = jwt.sign({ userId: user.id }, 'secret');
  user.tokens.push(token);
  user.categories.push(...defaultCategories);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    res.send(user);
  } catch (error) {
    res.status(400).send();
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
