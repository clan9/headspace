const express = require('express');
const passportService = require('../services/passport');
const passport = require('passport');
const Authentication = require('../controllers/authentication');

const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();

// @route   POST /api/auth/signin
// @desc    signin an existing user
// @access  Public
router.post('/signin', requireSignin, Authentication.signin);

// @route   POST /api/auth/signup
// @desc    signup a new user
// @access  Public
router.post('/signup', Authentication.signup);

module.exports = router;
