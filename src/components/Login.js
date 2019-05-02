import React from "react";
import "./css/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
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

export default Login;
