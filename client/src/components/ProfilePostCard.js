import React from 'react';
import moment from 'moment';

const ProfilePostCard = ({ title, createdAt, comments, likes }) => {
  return (
    <div className="post-card">
      <h3 className="post-card__title">{title}</h3>
      <p className="post-card__summary">
        Added: {moment(createdAt).format('Do MMM YYYY')}
      </p>
    </div>
  );
};

export default ProfilePostCard;

//   {comments && <p>Comments: {comments.length}</p>}
//   {likes && <p>Likes: {likes.length}</p>}
