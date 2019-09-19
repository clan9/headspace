import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setTextFilter,
  sortByDate,
  sortByLikes,
  sortByComments
} from 'actions/filters';

export class PostFilter extends Component {
  state = { text: '', sortBy: '' };

  onTextChange = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
    this.props.setTextFilter(text);
  };

  onSortChange = e => {
    const sortBy = e.target.value;
    this.setState(() => ({ sortBy }));

    sortBy === 'date' && this.props.sortByDate();
    sortBy === 'likes' && this.props.sortByLikes();
    sortBy === 'comments' && this.props.sortByComments();
  };

  render() {
    return (
      <div className="post__filter">
        <h2 className="post__filter__header">Search / Sort Posts</h2>
        <div className="post__filter__filters">
          <input
            type="text"
            placeholder="Enter title"
            className="post__filter__filters--field"
            value={this.state.text}
            onChange={this.onTextChange}
          />
          <select
            className="post__filter__filters--field"
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="likes">Most Liked</option>
            <option value="comments">Most Commented</option>
          </select>
          {this.props.isAuthenticated && (
            <Link to="/create" className="post__filter__filters--add-post">
              Add Post
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setTextFilter, sortByDate, sortByLikes, sortByComments }
)(PostFilter);
