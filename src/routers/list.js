/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { List, ListItem } = require('../models/list');
// const User = require('../models/user');
const auth = require('../middleware/authentication');

const router = new express.Router();

// Create List
router.post('/lists', auth, async (req, res) => {
  try {
    const list = new List({
      name: req.body.name,
      dateCreated: Date.now(),
      userId: req.curUser._id,
    });
    req.curUser.lists.push(list);
    await req.curUser.save();
    res.status(201).send(req.curUser.lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get User's Lists
router.get('/lists', auth, async (req, res) => {
  try {
    res.status(201).send(req.curUser.lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a list
router.delete('/lists', auth, async (req, res) => {
  try {
    req.curUser.lists = req.curUser.lists.filter((list) => {
      return list.id !== req.body.listId;
    });
    await req.curUser.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get User's Current List
router.get('/lists/current', auth, async (req, res) => {
  try {
    const curList = req.curUser.lists.find((list) => {
      return list._id.toString() === req.curUser.currentList.toString();
    });
    res.send(curList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Set User's Current List
router.post('/lists/current', auth, async (req, res) => {
  try {
    req.curUser.currentList = req.body.listId;
    await req.curUser.save();
    res.send(req.curUser.currentList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Item to Current List
router.post('/lists/items', auth, async (req, res) => {
  try {
    const curList = req.curUser.lists.find((list) => {
      return list._id.toString() === req.curUser.currentList.toString();
    });
    const item = new ListItem(req.body);
    curList.listItems.push(item);
    await req.curUser.save();
    res.send(curList.listItems);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Toggle Item's Active Property
router.patch('/lists/items', auth, async (req, res) => {
  try {
    const curList = req.curUser.lists.find((list) => {
      return list._id.toString() === req.curUser.currentList.toString();
    });
    const curItem = curList.listItems.find((item) => {
      return item._id.toString() === req.body.itemId;
    });
    curItem.active = !curItem.active;
    await req.curUser.save();
    res.send(curItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Delete list item

router.delete('/lists/items', auth, async (req, res) => {
  try {
    const curList = req.curUser.lists.find((list) => {
      return list._id.toString() === req.curUser.currentList.toString();
    });
    curList.listItems = curList.listItems.filter((item) => {
      return item._id.toString() !== req.body.itemId;
    });
    // console.log(curItems);
    await req.curUser.save();
    res.send(curList.listItems);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
