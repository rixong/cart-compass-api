/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { List, ListItem } = require('../models/list');
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
    res.status(201).send(list);
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
router.delete('/lists/:id', auth, async (req, res) => {
  try {
    req.curUser.lists = req.curUser.lists.filter((list) => {
      return list.id !== req.params.id;
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
    const list = req.curUser.lists.id(req.curUser.currentList);
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Set User's Current List
router.post('/lists/current/:listId', auth, async (req, res) => {
  console.log(req.params.listId);

  try {
    req.curUser.currentList = req.params.listId;
    await req.curUser.save();
    res.send(req.curUser.currentList);
  } catch (error) {
    res.status(500).send(error);
  }
});

/// List Item Routes

// Add Item to Current List
router.post('/lists/items', auth, async (req, res) => {
  try {
    const list = req.curUser.lists.id(req.curUser.currentList);
    const item = new ListItem(req.body);
    list.listItems.push(item);
    await req.curUser.save();
    res.send(list.listItems);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Toggle Item's Active Property
router.patch('/lists/items', auth, async (req, res) => {
  try {
    const list = req.curUser.lists.id(req.curUser.currentList);
    const item = list.listItems.id(req.body.itemId);
    item.active = !item.active;
    await req.curUser.save();
    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Delete list item
router.delete('/lists/items', auth, async (req, res) => {
  try {
    const list = req.curUser.lists.id(req.curUser.currentList);
    list.listItems = list.listItems.filter((item) => {
      return item._id.toString() !== req.body.itemId;
    });
    await req.curUser.save();
    res.send(list);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
