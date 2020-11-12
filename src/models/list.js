const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
  masterItemId: {
    type: mongoose.ObjectId,
    required: true,
  },
  quantity: String,
});

const ListItem = mongoose.model('ListItem', ListItemSchema);

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  sharedWith: [mongoose.ObjectId],
  listItems: [ListItemSchema],
});

const List = mongoose.model('List', ListSchema);

module.exports = {
  ListItemSchema,
  ListItem,
  ListSchema,
  List,
};
