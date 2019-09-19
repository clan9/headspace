import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost } from 'actions/posts';
import PostForm from 'components/PostForm';

export const AddPost = ({ addPost, history }) => {
  return (
    <div className="content-container">
      <h2 className="page__heading">Add a Post</h2>
      <PostForm
        onSubmit={post => {
          addPost(post, history);
        }}
      />
    </div>
  );
};

AddPost.propTypes = { addPost: PropTypes.func.isRequired };

export default connect(
  null,
  { addPost }
)(withRouter(AddPost));
