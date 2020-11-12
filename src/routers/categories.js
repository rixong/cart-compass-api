const express = require('express');
const auth = require('../middleware/authentication');

const router = new express.Router();

router.get('/categories', auth, async (req, res) => {
  try {
    res.status(201).send(req.curUser.categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/categories', auth, async (req, res) => {
  try {
    const category = req.curUser.categories.id(req.body.categoryId);
    console.log(category);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;
