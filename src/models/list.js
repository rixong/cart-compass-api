const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
  masterItemId: mongoose.ObjectId,
  quantity: String,
});

const ListItem = mongoose.model('ListItem', ListItemSchema);

const ListSchema = new Schema({
  name: String,
  dateCreated: Date,
  userId: mongoose.ObjectId,
  sharedWith: [mongoose.ObjectId],
  isCurrent: Boolean,
  listItems: [ListItemSchema],
});

const List = mongoose.model('List', ListSchema);

module.exports = {
  ListItemSchema,
  ListItem,
  ListSchema,
  List,
};
