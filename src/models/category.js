const mongoose = require('mongoose');

const DEFAULT_CATEGORIES = [
  { name: 'Produce', sortOrder: 1 },
  { name: 'Meat', sortOrder: 2 },
  { name: 'Dairy', sortOrder: 3 },
  { name: 'Bakery', sortOrder: 4 },
  { name: 'Baking Supplies', sortOrder: 5 },
  { name: 'Frozen Foods', sortOrder: 6 },
  { name: 'Beverages & Snacks', sortOrder: 7 },
  { name: 'Household Items', sortOrder: 8 },
  { name: 'Pet Supplies', sortOrder: 9 },
  { name: 'Cans and Jars', sortOrder: 10 },
  { name: 'Deli', sortOrder: 11 },
  { name: 'Alcohol', sortOrder: 12 },
  { name: 'Pharmacy', sortOrder: 13 },
  { name: 'Dry Goods', sortOrder: 14 },
];

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: String,
  sortOrder: Number,
});

const Category = mongoose.model('Category', CategorySchema);

const defaultCategories = DEFAULT_CATEGORIES.map((cat) => new Category(cat));

module.exports = {
  Category,
  CategorySchema,
  defaultCategories,
};
