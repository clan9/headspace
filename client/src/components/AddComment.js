import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { addComment } from 'actions/posts';

export class AddComment extends Component {
  state = { text: '', createdAt: moment(), error: '' };

  onChange = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ error: '' }));
    }, 6000);
  };

  componentWillUnmount() {
    this.setState(() => ({ error: '' }))
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.text) {
      this.setState(() => ({
        error: 'You cannot add an empty comment'
      }));
      this.resetError();
    } else {
      this.setState(() => ({ error: '' }));
      this.props.addComment({
        text: this.state.text,
        createdAt: this.state.createdAt.valueOf(),
        id: this.props.id,
        history: this.props.history
      });
    }
  };

  render() {
    return (
      <div className="content-container">
        <h2 className="page__heading">Add a Comment</h2>
        <form onSubmit={this.onSubmit} className="form">
          <div className="form__error__container">
            {this.state.error && (
              <p className="form__error">{this.state.error}</p>
            )}
          </div>

          <textarea
            type="text"
            placeholder="What did you think?"
            className="form__textarea"
            value={this.state.text}
            onChange={this.onChange}
          />
          <div className="comment__form__button__container">
            <Link to="/dashboard" className="comment__form__button">
              Home
            </Link>
            <button className="comment__form__button" type="submit">
              Save Comment
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.post,
  id: ownProps.match.params.id
});

export default connect(
  mapStateToProps,
  { addComment }
)(withRouter(AddComment));
