const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const Post = require('./Post');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

// Hash user password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Delete user posts when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Post.deleteMany({ user: user.id });
  next();
});

// Make this async with try catch?
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// // try this after trying above to see if it works
// userSchema.methods.validatePassword = async function(
//   candidatePassword,
//   callback
// ) {
//   const isMatch = await bcrypt.compare(candidatePassword, this.password);
//   return callback(isMatch);
// };

const User = mongoose.model('user', userSchema);

module.exports = User;
