import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editPost } from 'actions/posts';
import PostForm from 'components/PostForm';

export const EditPost = ({ post, id, history, editPost }) => {
  return (
    <div className="content-container">
      <h2 className="page__heading">Edit your Post</h2>
      <PostForm
        post={post}
        onSubmit={post => {
          editPost(id, post, history);
        }}
      />
    </div>
  );
};

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.post,
  id: ownProps.match.params.id
});

export default connect(
  mapStateToProps,
  { editPost }
)(withRouter(EditPost));
