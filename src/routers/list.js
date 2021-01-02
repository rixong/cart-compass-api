/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { List, ListItem } = require('../models/list');
const auth = require('../middleware/authentication');
// const User = require('../models/user');

const router = new express.Router();

// Create List
router.post('/lists', auth, async (req, res) => {
  try {
    const list = new List({
      name: req.body.name,
      dateCreated: Date.now(),
      userId: req.curUser._id,
    });
    await list.save();
    // req.curUser.lists.push(list._id);
    // await req.curUser.save();
    res.status(201).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get User's Lists (own and shared - using the list 'sharedWIth' field)
router.get('/lists', auth, async (req, res) => {
  try {
    const userLists = await List.find({ userId: req.curUser._id }).select('-listItems');
    const sharedLists = await List.find({ sharedWith: req.curUser._id }).select('-listItems');
    const lists = userLists.concat(sharedLists);
    // console.log(lists);
    res.status(201).send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a list
router.delete('/lists/:id', auth, async (req, res) => {
  try {
    await List.deleteOne({ _id: req.body.listId });
    res.status(201).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get User's Current List (only list items)
router.get('/lists/current', auth, async (req, res) => {
  try {
    const list = await List.findById(req.curUser.currentList).select('listItems');
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a shared list

// router.get('/lists/shared', auth, async (req, res) => {
//   try {
//     // console.log(req.curUser._id);
//     const user = await User.findOne({ _id: req.body.userId });
//     const list = user.lists.id(req.body.listId);

//     if (list.sharedWith.includes(req.curUser.id)) {
//       const itemIds = list.listItems.map((item) => item.masterItemId);
//       const arr = [];
//       // console.log(itemIds);
//       user.masterList.forEach((item) => {
//         // console.log(item._id);
//         if (itemIds.includes(item._id)) {
//           arr.push(item);
//         }
//       });
//       // console.log('blue', arr);
//       res.send({ list });
//     } else {
//       res.send({ error: 'This list has not been shared with you.' });
//     }
//   } catch (e) {
//     res.send('oops');
//   }
// });

// Set User's Current List ID
router.post('/lists/current/:listId', auth, async (req, res) => {
  try {
    // validate list existence
    req.curUser.currentList = req.params.listId;
    await req.curUser.save();
    res.status(200).send(req.curUser.currentList);
  } catch (error) {
    res.status(500).send(error);
  }
});

/// List Item Routes

// Add Item to Current List
// eslint-disable-next-line consistent-return
router.post('/lists/items', auth, async (req, res) => {
  try {
    const list = await List.findById(req.curUser.currentList);
    const existingItem = list.listItems.find((item) => {
      return item.name.toLowerCase() === req.body.name.toLowerCase();
    });
    if (existingItem) {
      return res.status(400).send('Item is already in your list');
    }
    const item = new ListItem(req.body);
    list.listItems.push(item);
    await list.save();
    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Toggle Item's Active Property
router.patch('/lists/items/:name', auth, async (req, res) => {
  try {
    const list = await List.findById(req.curUser.currentList);
    const curItem = list.listItems.find((item) => item.name === req.params.name);
    console.log(curItem);
    curItem.isActive = !curItem.isActive;
    await list.save();
    res.send(curItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Delete list item
// router.delete('/lists/items', auth, async (req, res) => {
//   try {
//     const list = req.curUser.lists.id(req.curUser.currentList);
//     list.listItems = list.listItems.filter((item) => {
//       return item._id.toString() !== req.body.itemId;
//     });
//     await req.curUser.save();
//     res.send(list);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
