import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from "../components/Login";
import Register from "../components/Register";
import "./css/CredentialsView.css";
import { loginUser, registerUser } from '../store/actions';

class CredentialsView extends React.Component {
  state = {
    // login shown when true, register shown when false
    login: true,
  };

  // Toggles the login component
  showLogin = () => {
    this.setState({ login: true });
  };

  // Toggles the register component
  showRegister = () => {
    this.setState({ login: false });
  };

  render() {
    return (
      <div className="credentials">
        <div className="login-box">
          <header>
            <div className={`header-btn ${this.state.login ? "selected": null}`} onClick={this.showLogin}>Login</div>
            <div className={`header-btn ${this.state.login === false ? "selected": null}`} onClick={this.showRegister}>Register</div>
          </header>

          <div className="form-container">
            {this.state.login ? <Login history={this.props.history} loginUser={this.props.loginUser} /> : <Register history={this.props.history} registerUser={this.props.registerUser} />}
          </div>
        </div>
      </div>
    );
  }
}

CredentialsView.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser, registerUser })(CredentialsView);
