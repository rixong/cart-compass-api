/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const express = require('express');
const { MasterItem } = require('../models/masterItem');
const auth = require('../middleware/authentication');

const router = new express.Router();

// Add Master Item
router.post('/items', auth, async (req, res) => {
  try {
    if (!req.curUser.categories.find((cat) => cat.id === req.body.categoryId)) {
      res.status(401).send({ error: 'Category Id not found.' });
    }
    const newItem = new MasterItem({
      name: req.body.name,
      categoryId: req.body.categoryId,
    });
    req.curUser.masterList.push(newItem);
    await req.curUser.save();
    res.status(201).send(req.curUser.masterList);
  } catch (error) {
    res.status(500).send({ error: 'Not connected to server.' });
  }
});

// Remove Master Item
router.delete('/items', auth, async (req, res) => {
  try {
    req.curUser.masterList = req.curUser.masterList.filter((item) => {
      return req.body.itemId !== item._id.toString();
    });
    await req.curUser.save();
    res.send();
  } catch (e) {
    res.status(500).send({ error: 'Not connected to server.' });
  }
});

module.exports = router;
