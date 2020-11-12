/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const { Category, CategorySchema } = require('./category');
// const { ListItemSchema, ListItem, ListSchema, List } = require('./list');
// const { MasterItemSchema, MasterItem } = require('./masterItem');

const { Category, CategorySchema } = require('./category');
const { ListItemSchema, ListItem, ListSchema, List } = require('./list');
const { MasterItemSchema, MasterItem } = require('./masterItem');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  currentList: {
    type: mongoose.ObjectId,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  masterList: [MasterItemSchema],
  categories: [CategorySchema],
  lists: [ListSchema],
});

// Login

UserSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login.');
  }
  return user;
};

// Hash plain text password - New User, Edit Profile
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


// Restrict response content - Hide sensitve data

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Create the JWT
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const JWTSecret = 'secret';
  // console.log('user._id', user._id)
  const token = await jwt.sign({ userId: user._id.toString() }, JWTSecret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
