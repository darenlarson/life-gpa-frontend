import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "./css/CredentialsView.css";

class CredentialsView extends React.Component {
  state = {
    login: true
  };

  showLogin = () => {
    this.setState({ login: true });
  };

  showRegister = () => {
    this.setState({ login: false });
  };

  render() {
    return (
      <div className="credentials">
        <div className="login-box">
          <header>
            <div className="header-btn" onClick={this.showLogin}>Login</div>
            <div className="header-btn" onClick={this.showRegister}>Register</div>
          </header>

          <div className="form-container">
            {this.state.login ? <Login loginUser={this.props.loginUser} /> : <Register registerUser={this.props.registerUser} />}
          </div>
        </div>
      </div>
    );
  }
}

export default CredentialsView;
