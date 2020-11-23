const express = require('express');

// const { defaultCategories } = require('../models/category');
const User = require('../models/user');
const { Category } = require('../models/category');
const { SortOrder } = require('../models/sortOrder');
const auth = require('../middleware/authentication');

const router = new express.Router();

// New User

router.post('/users', async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.status(400).send('Passwords don\'t match. Please try again.');
  }
  const user = new User(req.body);
  const categories = await Category.find({});
  let count = 1;
  categories.forEach((cat) => {
    const element = new SortOrder({ categoryId: cat.id, order: count });
    user.sortOrder.push(element);
    count += 1;
  });

  try {
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send('Email already exists.');
    } else {
      res.status(500).send('Something went wrong.');
    }
  }
});

// Logon

router.post('/login', async (req, res) => {
  try {
    // console.log('Logging in...');
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send('oops.');
  }
});

// Profile
router.get('/profile', auth, async (req, res) => {
  res.status(202).send({ user: req.curUser });
});

// Logout

router.post('/logout', auth, async (req, res) => {
  try {
    // console.log(req.curUser);
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
