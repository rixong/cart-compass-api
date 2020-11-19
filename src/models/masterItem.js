const mongoose = require('mongoose');

const { Schema } = mongoose;

const MasterItemSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
  },
  categoryId: mongoose.ObjectId,
});

const MasterItem = mongoose.model('MasterItem', MasterItemSchema);

module.exports = {
  MasterItemSchema,
  MasterItem,
};
