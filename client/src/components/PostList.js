import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllPosts } from 'actions/posts';
import selectedPosts from 'selectors/postSelector';
import PostCard from 'components/PostCard';

export class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    return (
      <div className="post-list">
        {this.props.posts.length === 0 ? (
          <div className="post-list__message">No posts to show</div>
        ) : (
          <div className="post-list__items">
            {this.props.posts.map(post => {
              return <PostCard key={post._id} {...post} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

PostList.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: selectedPosts(state.posts.posts, state.filters)
});

export default connect(
  mapStateToProps,
  { fetchAllPosts, selectedPosts }
)(PostList);
