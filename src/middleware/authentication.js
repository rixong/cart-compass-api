const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  console.log('Auth runs');
  try {
    const sentToken = req.headers.authorization.replace('Bearer ', '');
    const JWTSecret = 'secret';
    const decoded = jwt.verify(sentToken, JWTSecret);
    // The following checks to see if user exists AND if that user has the correct token.
    console.log(user);
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': sentToken });
    if (!user) {
      throw new Error();
    }
    req.curToken = sentToken;
    req.curUser = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please login.' });
  }
};

module.exports = auth;
