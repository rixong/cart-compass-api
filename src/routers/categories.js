const express = require('express');
const auth = require('../middleware/authentication');
const { Category } = require('../models/category');

const router = new express.Router();

// Send categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Adjust SortOrder

router.post('/categories', auth, async (req, res) => {
  try {
    req.curUser.sortOrder = req.body;
    await req.curUser.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
