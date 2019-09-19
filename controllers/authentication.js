// Authentication controller
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

// generate the jwt for a user
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user.id,
    iat: timestamp
  };
  return jwt.sign(payload, keys.secret, { expiresIn: '8h' });
};

// when a returning user signs in
exports.signin = (req, res, next) => {
  // at this point the user has already had email & pwd auth'd
  res.json({ token: tokenForUser(req.user) });
};

// when a user signs up for the first time
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    return res
      .status(422)
      .json({ msg: 'You must provide a name, email and password' });
  }

  // Check if provided email is already in use
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ msg: 'Email already in use' });
    }
  } catch (error) {
    return next(error);
  }

  // If a new user, create and save user record then return token
  const user = new User({
    name,
    email,
    password
  });

  await user.save();
  res.json({ token: tokenForUser(user) });
};
