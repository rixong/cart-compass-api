const express = require('express');
const { defaultCategories } = require('../models/category');

const router = new express.Router;
const User = require('../models/user');
// const defaultCategories = require('../models/category');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    user.categories.push(...defaultCategories);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

module.exports = router;