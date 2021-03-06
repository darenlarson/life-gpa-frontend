import React from "react";
import PropTypes from 'prop-types';
import '../css/index.css';

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

  componentDidMount() {
    this.nameInput.focus();
  }

  // Handler to save form input to state
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Submits form data and invokes registerUser()
  handleSubmit = e => {
    e.preventDefault();
    // Sends registration information to server
    this.props.registerUser(this.props.history, this.state);
  };

  render() {
    return (
      <div className="register-wrapper">
        <div className="register-ctn">
          <form className="register-form" onSubmit={this.handleSubmit}>
            <input
              required
              type="text"
              name="first_name"
              onChange={this.handleChange}
              value={this.state.first_name}
              placeholder="First Name"
              ref={(input) => { this.nameInput = input; }}
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
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired
}

export default Register;
