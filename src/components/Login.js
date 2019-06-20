import React from "react";
import PropTypes from 'prop-types';
import "./css/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  // Handler for entering form data to state
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Submits form and invokes loginUser()
  handleSubmit = e => {
    e.preventDefault();
    // Sends username and password to server
    this.props.loginUser(this.state);
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-ctn">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              required
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
              placeholder="Username"
            />
            <input
              required
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default Login;
