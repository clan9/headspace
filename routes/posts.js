const express = require('express');
require('../services/passport');
const passport = require('passport');
const PostController = require('../controllers/posts');

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

// @route   GET /api/posts/:id
// @desc    Read a post
// @access  Public
router.get('/:id', PostController.fetchSinglePost);

// @router  GET /api/posts
// @desc    Fetch all posts
// @access  Public
router.get('/', PostController.fetchAllPosts);

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', requireAuth, PostController.createPost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post by id
// @access  Private
router.delete('/:id', requireAuth, PostController.deletePost);

// @route   PATCH /api/posts/:id
// @desc    Edit an post by id
// @access  Private
router.patch('/:id', requireAuth, PostController.editPost);

// @route   POST /api/posts/:id/comments
// @desc    add a comment to a post
// @access  Private
router.post('/:id/comments', requireAuth, PostController.addComment);

// @route   DELETE /api/posts/:id/comments/:comment_id
// @desc    delete a comment you made
// @access  Private
router.delete(
  '/:id/comments/:comment_id',
  requireAuth,
  PostController.deleteComment
);

// @route   POST /api/posts/:id/like
// @desc    like a post (only once)
// @access  Private
router.post('/:id/like', requireAuth, PostController.likePost);

// @route   DELETE /api/posts/:id/unlike
// @desc    unlike a post (if prev liked)
// @access  Private
router.delete('/:id/unlike', requireAuth, PostController.unlikePost);

module.exports = router;
