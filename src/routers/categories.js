const express = require('express');
const auth = require('../middleware/authentication');
const { DEFAULT_CATEGORIES, Category } = require('../models/category');

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

// Build Categories

router.post('/categories/admin', async (req, res) => {
  try {
    if (req.body.password === process.env.ADMIN_PW) {
      DEFAULT_CATEGORIES.forEach((category) => {
        const cat = new Category(category);
        cat.save();
      });
      res.status(201).send('Categories built.');
    } else {
      res.status(400).send('You are not authorized.');
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
