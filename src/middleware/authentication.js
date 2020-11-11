const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  console.log('Auth runs');
  try {
    const sentToken = req.headers.authorization.replace('Bearer ', '');
    const JWTSecret = 'secret';
    const decoded = jwt.verify(sentToken, JWTSecret);
    // The following checks to see if user exists AND if that user has the correct token.
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': sentToken });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Please login.' });
  }
};


//   const token = req.headers.authorization.replace('Bearer ', '');
//   // console.log(token);
//   const JWTSecret = 'secret';
//   let id = jwt.verify(token, JWTSecret);
//   id = id.userId;
//   const user = User.findById(id);
//   console.log(user);

//   next()
// });

module.exports = auth;
