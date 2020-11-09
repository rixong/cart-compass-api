const mongoose = require('mongoose');

const { Schema } = mongoose;

const MasterItemSchema = new Schema({
  name: String,
  categoryId: mongoose.ObjectId,
});

const MasterItem = mongoose.model('MasterItem', MasterItemSchema);

module.exports = {
  MasterItemSchema,
  MasterItem,
};
