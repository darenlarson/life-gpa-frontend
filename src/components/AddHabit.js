import React from "react";

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: "",
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addHabit(this.state.habit);
    this.setState({ habit: '' });
  };

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            name="habit"
            onChange={this.handleChange}
            value={this.state.habit}
            placeholder="Habit"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddHabit;
