import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostCard = ({
  _id,
  title,
  content,
  likes,
  comments,
  name,
  createdAt
}) => {
  const renderSummary = () => {
    const postSummary = content
      .split(' ')
      .slice(0, 20)
      .join(' ');
    return postSummary;
  };

  return (
    <Link to={`/post/${_id}`} className="post-card__link">
      <div className="post-card">
        <h3 className="post-card__title">{title}</h3>
        <p className="post-card__summary">
          {renderSummary()}.....
          <span className="post-card__summary--more"> more</span>
        </p>
        <div className="post-card__stats">
          <div className="post-card__stats__left">
            <p className="post-card__stats--by">
              By: {name} on {moment(createdAt).format('Do MMM YYYY - HH:mm')}
            </p>
          </div>
          <div className="post-card__stats__right">
            <p className="post-card__stats__right--comments">
              Comments: {comments.length}
            </p>
            <p className="post-card__stats__right--likes">
              Likes: {likes.length}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
