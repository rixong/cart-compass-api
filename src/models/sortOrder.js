const mongoose = require('mongoose');

const { Schema } = mongoose;

const SortOrderSchema = new Schema({
  categoryId: {
    type: mongoose.ObjectId,
  },
  order: {
    type: Number,
  },
});

const SortOrder = mongoose.model('SortOrder', SortOrderSchema);

module.exports = { SortOrder, SortOrderSchema };
