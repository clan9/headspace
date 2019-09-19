import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { fetchPost, deletePost, likePost, unlikePost } from 'actions/posts';

export const Post = ({
  fetchPost,
  deletePost,
  post,
  comments,
  id,
  loading,
  userId,
  author,
  history,
  likePost,
  unlikePost,
  error
}) => {
  useEffect(() => {
    fetchPost(id);
  }, [fetchPost, id]);

  const renderComments = () => {
    if (post.comments) {
      return post.comments.map(comment => (
        <div key={comment._id} className="post__comments__item">
          <p className="post__comments__item__text">
            <span className="post__comments__item__text--name">
              {comment.name} said:{' '}
            </span>
            {comment.text}
          </p>
          <p className="post__comments__item__time">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
      ));
    }
  };

  const renderActions = () => {
    if (userId && userId === author) {
      return (
        <div className="post__actions">
          <Link className="post__actions__item" to={`/edit/${id}`}>
            Edit your post
          </Link>
          <Link className="post__actions__item" to={`/comment/${id}`}>
            Add a Comment
          </Link>
          <button
            className="post__actions__item"
            onClick={() => onDelete(id, history)}
          >
            Delete this Post
          </button>
        </div>
      );
    } else if (userId) {
      return (
        <div className="post__actions">
          <Link className="post__actions__item" to={`/comment/${id}`}>
            Add a Comment
          </Link>
        </div>
      );
    }
  };

  const renderLikeButtons = userId => {
    if (userId) {
      return (
        <div>
          <button className="like-post-button" onClick={onLikePost}>
            Like
          </button>
          <button className="like-post-button" onClick={onUnlikePost}>
            Unlike
          </button>
        </div>
      );
    }
  };

  const onDelete = () => {
    deletePost(id, history);
  };

  const onLikePost = () => {
    likePost(id);
  };

  const onUnlikePost = () => {
    unlikePost(id);
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="content-container">
          <div className="post">
            <div className="post__heading">
              <h2 className="post__heading--title">{post.title}</h2>
              <p className="post__heading--subtitle">
                by {post.name} on {moment(post.createdAt).format('Do MMM YYYY')}
              </p>
            </div>
            <div className="post__content">
              <p>{post.content}</p>
            </div>
            <div className="post__stats">
              <p>
                Latest edit/comment:{' '}
                <span className="post__stats__info">
                  {moment(post.editedAt).fromNow()}
                </span>{' '}
              </p>
              <div>{renderLikeButtons(userId)}</div>
            </div>
          </div>
          <div className="post__error__container">
            {error && <p className="post__error">{error}</p>}
          </div>
          <div>{renderActions()}</div>
          {comments && comments.length > 0 && (
            <h3 className="post__comments__header">Comments</h3>
          )}
          <div className="post__comments">{renderComments()}</div>
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.post,
  comments: state.posts.post.comments,
  loading: state.posts.loading,
  id: ownProps.match.params.id,
  userId: state.auth.user._id,
  author: state.posts.post.user,
  error: state.posts.error
});

export default connect(
  mapStateToProps,
  { fetchPost, deletePost, likePost, unlikePost }
)(withRouter(Post));
