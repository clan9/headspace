const express = require('express');
require('../services/passport');
const passport = require('passport');
const UserController = require('../controllers/user');

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

// @route   GET /api/user
// @desc    get a user from token
// @access  Private
router.get('/', requireAuth, UserController.getUser);

// @route   GET /api/user/profile
// @desc    get all posts by a user
// @access  Private
router.get('/profile', requireAuth, UserController.getProfileSummary);

// @route   DELETE /api/user
// @desc    delete a user account - should remove all their posts too
// @access  Private
router.delete('/', requireAuth, UserController.deleteUser);

module.exports = router;
