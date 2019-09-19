const passport = require('passport');
const User = require('../models/User');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// setup options for local strategy
const localOptions = { usernameField: 'email' };

// create local strategy
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // verify this email and password, if they are correct,
  // call done with the user
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    //compare passwords - is 'password' equal to user.password?
    // comparePassword is method we added to userSchema.methods in User model
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in payload exists in database
  // if it does, call done with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
