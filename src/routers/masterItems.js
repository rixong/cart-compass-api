/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const express = require('express');
const { MasterItem } = require('../models/masterItem');
const auth = require('../middleware/authentication');
const User = require('../models/user');

const router = new express.Router();

// Add Master Item
router.post('/items', auth, async (req, res) => {
  try {
    // Check if item already exists - return if true, or create new item
    let foundItem = req.curUser.masterList.find((item) => item.name === req.body.name);
    if (foundItem) {
      res.status(202).send({ item: foundItem, message: 'exists' });
    } else {
      foundItem = new MasterItem({
        name: req.body.name,
        categoryId: req.body.categoryId,
      });
      req.curUser.masterList.push(foundItem);
      await req.curUser.save();
      res.status(201).send({ item: foundItem, message: 'new' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Not connected to server.' });
  }
});

// Remove Master Item
router.delete('/items/:itemId', auth, async (req, res) => {
  // console.log(req.params.itemId);
  try {
    // remove from masterlist
    req.curUser.masterList = req.curUser.masterList.filter((item) => {
      return req.params.itemId !== item._id.toString();
    });

    await req.curUser.save();
    res.send(req.curUser.masterList);
  } catch (e) {
    res.status(500).send({ error: 'Not connected to server.' });
  }
});

// Get another user's masterlist
router.get('/items', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select('-lists');
    // console.log(user);
    res.send(user);
  } catch (e) {
    // console.log(e);
  }
});

module.exports = router;
