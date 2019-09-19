import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { registerUser } from 'actions/auth';

export class SignUp extends Component {
  state = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: ''
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onFirstPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ passwordOne: password }));
  };

  onSecondPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ passwordTwo: password }));
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ error: '' }));
    }, 6000);
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.email) {
      this.setState(() => ({
        error: 'Please provide a name, email address and password'
      }));
      this.resetError();
    } else if (!validator.isEmail(this.state.email)) {
      this.setState(() => ({ error: 'Email address is not valid' }));
      this.resetError();
    } else if (this.state.passwordOne !== this.state.passwordTwo) {
      this.setState(() => ({ error: 'Passwords do not match!' }));
      this.resetError();
    } else {
      this.setState(() => ({ error: '' }));
      this.props.registerUser(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.passwordOne
        },
        this.props.history
      );
    }
  };

  render() {
    return (
      <div className="content-container">
        <form onSubmit={this.onSubmit} className="form">
          <h2 className="form__heading">Sign up for an account</h2>
          <div className="form__error__container">
            {this.state.error && (
              <p className="form__error">{this.state.error}</p>
            )}
            {this.props.error && (
              <p className="form__error">{this.props.error}</p>
            )}
          </div>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter a user name"
            autoComplete="off"
            className="form__field"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="off"
            className="form__field"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <input
            type="password"
            name="passwordOne"
            minLength="6"
            placeholder="Enter password"
            className="form__field"
            value={this.state.passwordOne}
            onChange={this.onFirstPasswordChange}
          />
          <input
            type="password"
            name="passwordTwo"
            minLength="6"
            placeholder="Confirm password"
            className="form__field"
            value={this.state.passwordTwo}
            onChange={this.onSecondPasswordChange}
          />
          <div className="form__button__container">
            <button className="form__button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
