import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.registerUser(this.state);
  };

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            name="first_name"
            onChange={this.handleChange}
            value={this.state.first_name}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="last_name"
            onChange={this.handleChange}
            value={this.state.last_name}
            placeholder="Last Name"
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
