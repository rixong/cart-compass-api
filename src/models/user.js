
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Category, CategorySchema } = require('./category');
const { ListItemSchema, ListItem, ListSchema, List } = require('./list');
const { MasterItemSchema, MasterItem } = require('./masterItem');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Not a proper email format.');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  tokens: [],
  masterList: [MasterItemSchema],
  categories: [CategorySchema],
  lists: [ListSchema],
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

///  FOR TESTING

// const userId = '5fa9a647ecf09446f09659e0';
// const produceId = '5fa9760f30188141a5d21110';
// const meatId = '5fa9760f30188141a5d21112';
// const apple = '5fa9763b90650b41cf091860';
// const pork = '5fa9763b90650b41cf091861';
// const lettuce = '5fa9763b90650b41cf091862';
// const heb = '5fa9766e288f3242033171a2';
// const costco = '5fa9766e288f3242033171a3';
// const appleItem = '5fa9550942bb2e2e583b637e';
// const porkItem = '5fa9550942bb2e2e583b637f';
// const lettuceItem = '5fa9550942bb2e2e583b6380';

// mongoose.connect('mongodb://127.0.0.1:27017/cart-compass', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

//ADD USER

// const user1 = new User({
//   name: 'Sammy',
//   email: 'rixong@gmail.com',
//   password: '125',
// });
// user1.categories.push(...defaultCategories);
// user1.save()
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log('error here!', error);
//   });

      //ADD A FEW ITEMS TO MASTERLIST

  //     User.findById(userId)
  //       .then((user) => {
  //         const item1 = new MasterItem({
  //             name: 'apples',
  //             categoryId: produceId,
  //   });
  //   const item2 = new MasterItem({
  //     name: 'pork',
  //     categoryId: meatId,
  //   });
  //   const item3 = new MasterItem({
  //     name: 'lettuce',
  //     categoryId: produceId,
  //   });
  //   user.masterList.push(item1);
  //   user.masterList.push(item2);
  //   user.masterList.push(item3);
  //   user.save();
  //   console.log(user.masterList);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

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

///TEST QUERIES

// User.findById(userId)
//   .then((user) => {
//     const myList = user.lists.id(heb);
//     const myItem = myList.listItems.id(appleItem);
//     console.log(myItem);
//   });

// List.findById(heb)
//   .then((list) => {
//     console.log(list);
//   });
