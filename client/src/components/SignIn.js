import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { login } from 'actions/auth';

export class SignIn extends Component {
  state = { email: '', password: '', error: '' };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ error: '' }));
    }, 6000);
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({
        error: 'Please provide an email address and password'
      }));
      this.resetError();
    } else if (!validator.isEmail(this.state.email)) {
      this.setState(() => ({ error: 'Email address is not valid' }));
      this.resetError();
    } else {
      const error = '';
      this.setState(() => ({ error }));
      this.props.login(
        {
          email: this.state.email,
          password: this.state.password
        },
        this.props.history
      );
    }
  };

  render() {
    return (
      <div className="content-container">
        <form onSubmit={this.onSubmit} className="form">
          <h2 className="form__heading">Log in to your account</h2>
          <div className="form__error__container">
            {this.state.error && (
              <p className="form__error">{this.state.error}</p>
            )}
            {this.props.error && (
              <p className="form__error">{this.props.error}</p>
            )}
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            autoFocus
            autoComplete="off"
            className="form__field"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="form__field"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <div className="form__button__container">
            <button className="form__button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string
};

// Not using this for <Redirect /> yet - doing it inside login action
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { login }
)(withRouter(SignIn));
