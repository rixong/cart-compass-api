const express = require('express');

// const { defaultCategories } = require('../models/category');
const User = require('../models/user');
const { Category } = require('../models/category');
const { SortOrder } = require('../models/sortOrder');
const auth = require('../middleware/authentication');

const router = new express.Router();

// New User

router.post('/users', async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).send({ error: 'Account already exists with this email' });
  }
  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).send({ error: 'Passwords don\'t match' });
  }
  const userFields = ['name', 'email', 'password'];
  const user = new User(req.body);
  try {
    await user.save();
    const categories = await Category.find({});
    let count = 1;
    categories.forEach((cat) => {
      const element = new SortOrder({ categoryId: cat.id, order: count });
      user.sortOrder.push(element);
      count += 1;
    });
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    const foundErrors = [];
    userFields.forEach((field) => {
      if (e.errors[field]) {
        foundErrors.push(e.errors[field].message);
      }
    });
    res.status(400).send({ error: foundErrors.join('. ') });
  }
});

// Logon

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid Login' });
  }
});

// Profile
router.get('/profile', auth, async (req, res) => {
  res.status(202).send({ user: req.curUser });
});

// Logout

router.get('/logout', auth, async (req, res) => {
  try {
    // req.curUser.tokens = req.curUser.tokens.filter((token) => token.token !== req.curToken);
    req.curUser.tokens = [];
    await req.curUser.save();
    res.send({ message: 'done' });
  } catch (error) {
    res.status(500).send();
  }
});

// All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    // const names = users.map((user) => user.name);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
