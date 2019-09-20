import React, { useEffect } from 'react';
import PostList from 'components/PostList';
import PostFilter from 'components/PostFilter';
import { connect } from 'react-redux';

export const Dashboard = ({ name = '' }) => {
  const nameCasing = () => {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="content-container">
      <h2 className="page__heading">Welcome {nameCasing()}</h2>
      {!name && (
        <p className="dashboard__text">
          In order to submit a post, comment or like, please sign up for a new
          account or log in.
        </p>
      )}
      <PostFilter />
      <PostList />
    </div>
  );
};

const mapStatetoProps = state => ({
  name: state.profile.name
});

export default connect(mapStatetoProps)(Dashboard);
