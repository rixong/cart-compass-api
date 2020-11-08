const mongoose = require('mongoose');

const { Schema } = mongoose;

const MasterItemSchema = new Schema({
  name: String,
  categoryId: mongoose.ObjectId,
});

const ListSchema = new Schema({
  masterItemId: Number,
  quantity: String,
});

const CategorySchema = new Schema({
  name: String,
  sortOrder: Number,
});

const List = mongoose.model('List', ListSchema);
const MasterItem = mongoose.model('MasterItem', MasterItemSchema);
const Category = mongoose.model('Category', CategorySchema);

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  masterList: [{
    name: String,
    categoryId: mongoose.ObjectId,
  }],
  // lists: [List],
  categories: [{
    name: String,
    sortOrder: Number,
  }],
});

const User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://127.0.0.1:27017/cart-compass', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

/* const cat1 = new Category({
  name: 'Produce',
  sortOrder: 1,
});

const cat2 = new Category({
  name: 'Meat',
  sortOrder: 2,
});

const user1 = new User({
  name: 'Rick',
  email: 'rixong@gmail.com',
  password: '125',
  categories: [cat1, cat2],
  masterList: [],
});

user1.save()
  .then((user) => console.log(user))
  .catch((error) => {
    console.log('error here!', error);
  }); */

// const item1 = new MasterItem({
//   name: 'apples',
//   categoryId: 345,
// });

// User.findById('5fa6d7889e61316d2af68d96')
//   .then((user) => {
//     console.log(user.categories);
//     const cat3 = new Category({
//       name: 'Bakery',
//       sortOrder: 3,
//     });
//     user.categories.push(cat3);
//     user.save();
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// User.findById('5fa6d7889e61316d2af68d96')
//   .then((user) => {
//     const item = new MasterItem({
//       name: 'apples',
//       categoryId: '5fa6d7889e61316d2af68d94',
//     });
//     // console.log(user.masterList)
//     user.masterList.push(item);
//     user.save();
//   })
//   .catch((error) => {
//     console.log(error);
//   })

User.findById('5fa6d7889e61316d2af68d96')
  .then((user) => {
    console.log(user.masterList[0]);
  })



