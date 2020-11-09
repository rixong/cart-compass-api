craconst express = require('express');
const { MasterItem } = require('../models/masterItem');
const User = require('../models/user');

const router = new express.Router();

router.post('/items', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const newItem = new MasterItem({
      name: req.body.name,
      categoryId: req.body.categoryId,
    });
    user.masterList.push(newItem);
    await user.save();
    res.status(201).send(user.masterList);
  } catch (error) {
    res.status(500).send('Not working right.');
  }
});

module.exports = router;
