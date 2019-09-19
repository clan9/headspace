import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <div className="login">
      <div className="login__box">
        <h1 className="login__title">headSpace</h1>
        <p className="login__text">
          Share your thoughts and connect with others!
        </p>
        <Link to="/signup" className="login__buttons cta">
          Sign Up!
        </Link>
        <Link to="/signin" className="login__buttons">
          Log In
        </Link>
        <Link to="/dashboard" className="login__buttons">
          Browse Posts
        </Link>
      </div>
    </div>
  );
};

export default Login;
