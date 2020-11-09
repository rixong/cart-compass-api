const express = require('express');
const { List } = require('../models/list');
const User = require('../models/user');

const router = new express.Router();

router.post('/lists', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const list = new List({
      name: req.body.name,
      dateCreated: Date.now(),
      userId: user.id,
      isCurrent: true,
    });
    user.lists.push(list);
    user.save();
    res.status(201).send(user.lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/lists', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send(user.lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
