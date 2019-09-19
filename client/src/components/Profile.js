import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { profileSummary, deleteUser } from 'actions/profile';
// import ProfilePostCard from 'components/ProfilePostCard';
import PostCard from 'components/PostCard';

export class EditUser extends Component {
  componentDidMount() {
    this.props.profileSummary();
  }

  renderMostCommented = () => {
    if (this.props.commentCount) {
      return (
        <div className="profile__commented">
          <p className="profile__text">Your most commented post is:</p>
          <PostCard {...this.props.mostCommentedPost} />
        </div>
      );
    }
  };

  renderMostLiked = () => {
    if (this.props.likeCount) {
      return (
        <div className="profile__liked">
          <p className="profile__text">Your most liked post is:</p>
          <PostCard {...this.props.mostLikedPost} />
        </div>
      );
    }
  };

  renderWords = () => {
    let postWord, haveWord, commentWord, likeWord;

    this.props.postCount === 1
      ? (postWord = 'post') && (haveWord = 'has')
      : (postWord = 'posts') && (haveWord = 'have');

    this.props.commentCount === 1
      ? (commentWord = 'comment')
      : (commentWord = 'comments');

    this.props.likeCount === 1 ? (likeWord = 'like') : (likeWord = 'likes');

    return { postWord, haveWord, commentWord, likeWord };
  };

  onDeleteUser = () => {
    this.props.deleteUser(this.props.history);
  };

  renderContent = () => {
    const { postWord, haveWord, commentWord, likeWord } = this.renderWords();

    if (this.props.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content-container">
          <h2 className="page__heading">
            Some info for you {this.props.name}!
          </h2>
          <div className="profile">
            <p className="profile__text">
              You joined the community{' '}
              <span className="profile__stat">
                {moment(this.props.registerDate).fromNow()}
              </span>
              .
            </p>
            <p className="profile__text">
              Since then you have added{' '}
              <span className="profile__stat">
                {this.props.postCount} {postWord}
              </span>{' '}
              which {haveWord} received{' '}
              <span className="profile__stat">
                {this.props.commentCount} {commentWord}
              </span>{' '}
              &{' '}
              <span className="profile__stat">
                {this.props.likeCount} {likeWord}
              </span>{' '}
              !
            </p>
            <div>{this.renderMostCommented()}</div>
            <div>{this.renderMostLiked()}</div>
            <div className="profile__actions">
              <Link className="profile__actions__item" to="/dashboard">
                Home
              </Link>
              <button
                className="profile__actions__item"
                onClick={this.onDeleteUser}
              >
                Delete your account
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = ({ profile }) => ({
  name: profile.name,
  email: profile.email,
  registerDate: profile.registerDate,
  postCount: profile.postCount,
  commentCount: profile.commentCount,
  likeCount: profile.likeCount,
  mostCommentedPost: profile.mostCommentedPost,
  mostLikedPost: profile.mostLikedPost,
  loading: profile.loading
});

export default connect(
  mapStateToProps,
  { profileSummary, deleteUser }
)(withRouter(EditUser));
