import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "actions/auth";

export const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const userLogout = () => {
    logout();
  };

  const renderLinks = () => {
    if (!isAuthenticated && !loading) {
      return (
        <div className="navbar">
          <div className="navbar__left">
            <NavLink
              to="/dashboard"
              activeClassName="is-active"
              className="navbar__link navbar__link--logo"
            >
              headSpace
            </NavLink>
          </div>

          <div className="navbar__right">
            <NavLink
              to="/signup"
              activeClassName="is-active"
              className="navbar__link"
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/signin"
              activeClassName="is-active"
              className="navbar__link"
            >
              Log In
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <div className="navbar__left">
            <NavLink
              to="/dashboard"
              activeClassName="is-active"
              className="navbar__link navbar__link--logo"
            >
              headSpace
            </NavLink>
          </div>
          <div className="navbar__right">
            <NavLink
              to="/profile"
              activeClassName="is-active"
              className="navbar__link"
            >
              Your Stats
            </NavLink>
            <NavLink to="/" onClick={userLogout} className="navbar__link">
              Logout
            </NavLink>
          </div>
        </div>
      );
    }
  };

  return <div>{renderLinks()}</div>;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
