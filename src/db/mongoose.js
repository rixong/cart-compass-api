const mongoose = require('mongoose');

const { Schema } = mongoose;

const DEFAULT_CATEGORIES = [
  { name: 'Dairy', sortOrder: 3 },
  { name: 'Produce', sortOrder: 1 },
  { name: 'Meat', sortOrder: 2 },
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

const CategorySchema = new Schema({
  name: String,
  sortOrder: Number,
});

const MasterItemSchema = new Schema({
  name: String,
  categoryId: mongoose.ObjectId,
});

const ListItemSchema = new Schema({
  masterItemId: mongoose.ObjectId,
  quantity: String,
});

const ListSchema = new Schema({
  name: String,
  dateCreated: Date,
  userId: mongoose.ObjectId,
  isCurrent: Boolean,
  listItems: [ListItemSchema],
});

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
  masterList: [MasterItemSchema],
  categories: [CategorySchema],
  lists: [ListSchema],
});


const List = mongoose.model('List', ListSchema);
const ListItem = mongoose.model('ListItem', ListItemSchema);
const MasterItem = mongoose.model('MasterItem', MasterItemSchema);
const Category = mongoose.model('Category', CategorySchema);
const User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://127.0.0.1:27017/cart-compass', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const userId = '5fa858a5365f1011fefa7b34';
const produceId = '5fa85971758a5b12956dd724';
const meatId = '5fa85971758a5b12956dd726';
const pork = '5fa85a9d290e4e138e49b509';
const apple = '5fa85a9d290e4e138e49b508';
const lettuce = '5fa85a9d290e4e138e49b50a';
const heb = '5fa85cab6cb48a14ba626248';
const costco = '5fa85cab6cb48a14ba626249';
const appleItem = '5fa85dbe466c0715c012747d';
const porkItem = '5fa85a9d290e4e138e49b509';


const user1 = new User({
  name: 'Bob',
  email: 'rixong@gmail.com',
  password: '125',
  categories: [],
});

//ADD USER

// user1.save()
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log('error here!', error);
//   });

//ADD DEFAULT CATEGORIES

// User.findById(userId)
//   .then((user) => {
//     DEFAULT_CATEGORIES.forEach((cat) => {
//       const newCat = new Category(cat);
//       user.categories.push(newCat);
//     });
//     user.save();
//     console.log(user.categories);
//   });

//ADD A FEW ITEMS TO MASTERLIST

// User.findById(userId)
//   .then((user) => {
//     const item1 = new MasterItem({
//       name: 'apples',
//       categoryId: produceId,
//     });
//     const item2 = new MasterItem({
//       name: 'pork',
//       categoryId: meatId,
//     });
//     const item3 = new MasterItem({
//       name: 'lettuce',
//       categoryId: produceId,
//     });
//     user.masterList.push(item1);
//     user.masterList.push(item2);
//     user.masterList.push(item3);
//     user.save();
//     console.log(user.masterList);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//ADD A FEW LISTS

// User.findById(userId)
//   .then((user) => {
//     const list11 = new List({
//       name: 'Heb',
//       dateCreated: Date.now(),
//       userId,
//       isCurrent: false,
//     });
//     const list12 = new List({
//       name: 'Costco',
//       dateCreated: Date.now(),
//       userId,
//       isCurrent: false,
//     });
//     user.lists.push(list11);
//     user.lists.push(list12);
//     user.save();
//     console.log('Done', user.lists);
//   })

// ADD A FEW ITEMS TO HEB LIST

// User.findById(userId)
//   .then((user) => {
//     const myList = user.lists.id(heb);
//     const item1 = new ListItem({
//       masterItemId: apple,
//       quantity: '1 dozen',
//     });
//     const item2 = new ListItem({
//       masterItemId: pork,
//       quantity: '2 lbs',
//     });
//     const item3 = new ListItem({
//       masterItemId: lettuce,
//       quantity: '6 stalks',
//     });
//     myList.listItems.push(item1);
//     myList.listItems.push(item2);
//     myList.listItems.push(item3);
//     user.save();
//     console.log(myList.listItems);
//   })


User.findById(userId)
  .then((user) => {
    const myList = user.lists.id(heb);
    const myItem = myList.listItems.id(appleItem);
    console.log(myItem);
  });

// List.findById(heb)
//   .then((list) => {
//     console.log(list);
//   });
