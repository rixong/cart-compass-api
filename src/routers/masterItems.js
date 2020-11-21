/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const express = require('express');
const { MasterItem } = require('../models/masterItem');
const auth = require('../middleware/authentication');

const router = new express.Router();

// Add Master Item
router.post('/items', auth, async (req, res) => {
  // Check if category exists
  try {
    if (!req.curUser.categories.find((cat) => cat.id === req.body.categoryId)) {
      res.status(401).send({ error: 'Category Id not found.' });
    }
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
router.delete('/items/:id', auth, async (req, res) => {
  try {
    req.curUser.masterList = req.curUser.masterList.filter((item) => {
      return req.params.itemId !== item._id.toString();
    });
    await req.curUser.save();
    res.send();
  } catch (e) {
    res.status(500).send({ error: 'Not connected to server.' });
  }
});

module.exports = router;
