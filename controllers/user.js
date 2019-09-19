// Users controller
const User = require('../models/User');
const Post = require('../models/Post');
const validator = require('validator');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProfileSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userPosts = await Post.find({ user: req.user.id });

    if (!userPosts) {
      return res.status(404).json({ msg: 'No posts' });
    }

    const registerDate = user.date;

    const postCount = userPosts.length;

    const commentCount = userPosts
      .map(post => post.comments.length)
      .reduce((sum, comment) => sum + comment, 0);

    const likeCount = userPosts
      .map(post => post.likes.length)
      .reduce((sum, like) => sum + like, 0);

    const mostCommentedPost = userPosts.sort((a, b) => {
      return a.comments.length < b.comments.length ? 1 : -1;
    })[0];

    const mostLikedPost = userPosts.sort((a, b) => {
      return a.likes.length < b.likes.length ? 1 : -1;
    })[0];

    res.json({
      registerDate,
      postCount,
      commentCount,
      likeCount,
      mostCommentedPost,
      mostLikedPost
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.remove();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
