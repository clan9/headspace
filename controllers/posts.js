// Posts controller
const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
      editedAt: req.body.editedAt,
      name: user.name,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.fetchSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(404).json({ msg: 'Posts not found' });
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();
    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { title, content, editedAt } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check that user is owner of the post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorised to edit this post' });
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    post.editedAt = editedAt;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  console.log('REQ.BODY: ', req.body);
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      text: req.body.text,
      createdAt: req.body.createdAt,
      name: user.name,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    post.editedAt = Date.now();
    await post.save();
    // return post instead of just comments?
    res.json(post);
  } catch (error) {
    console.error(error.message);

    // if (err.kind === 'ObjectId') {
    //   return res.status(404).json({ msg: 'Post not found' });
    // }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Get comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check that user is owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorised to delete this comment' });
    }

    const updatedComments = post.comments.filter(
      comment => comment.id !== req.params.comment_id
    );

    post.comments = updatedComments;
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const alreadyLiked = post.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (alreadyLiked) {
      return res.status(422).json({ msg: 'You can only like a post once' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likes = post.likes;

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user has liked the post (cannot unlike if not)
    const haveLiked = likes.find(like => like.user.toString() === req.user.id);

    if (!haveLiked) {
      return res.status(422).json({ msg: 'You have not yet liked this post' });
    }

    const updatedLikes = likes.filter(
      like => like.user.toString() !== req.user.id
    );

    post.likes = updatedLikes;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};
