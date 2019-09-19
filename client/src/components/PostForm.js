import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post ? props.post.title : '',
      content: props.post ? props.post.content : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      editedAt: props.post ? moment(props.post.editedAt) : moment(),
      error: ''
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    const editDate = moment();
    this.setState(() => ({ title, editedAt: editDate }));
  };

  onContentChange = e => {
    const content = e.target.value;
    const editDate = moment();
    this.setState(() => ({ content, editedAt: editDate }));
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ error: '' }));
    }, 6000);
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.content) {
      this.setState({
        error: 'Please provide a title and the content for your post'
      });
      this.resetError();
    } else {
      this.setState({ error: '' });
      this.props.onSubmit({
        title: this.state.title,
        content: this.state.content,
        createdAt: this.state.createdAt.valueOf(),
        editedAt: moment().valueOf()
      });
    }
  };

  render() {
    return (
      <form className="post__form" onSubmit={this.onSubmit}>
        <div className="post__form__error__container">
          {this.state.error && (
            <p className="post__form__error">{this.state.error}</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Post Title"
          className="post__form__field"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <textarea
          type="text"
          placeholder="Post Content"
          className="post__form__textarea"
          value={this.state.content}
          onChange={this.onContentChange}
        />
        <div className="post__form__button__container">
          <Link className="post__form__button" to="/dashboard">
            Home
          </Link>
          <button className="post__form__button">Save Post</button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {}
)(PostForm);
