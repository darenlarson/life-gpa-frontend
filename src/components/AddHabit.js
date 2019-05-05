import React from "react";
import './css/AddHabit.css';

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
      <div className="add-habit-wrapper">
        <form className="habit-form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            name="habit"
            onChange={this.handleChange}
            value={this.state.habit}
            placeholder="Enter a new habit"
          />
          <button type="submit">ADD</button>
        </form>
      </div>
    );
  }
}

export default AddHabit;
