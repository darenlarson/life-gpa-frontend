import React from "react";
import PropTypes from 'prop-types';
// import './css/AddHabit.css';
import '../css/index.css';

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: "",
    };
  }

  // Handler for setting characters entered in form to state
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Submits the habit entered, invokes addHabit(), which sends habit to server
  handleSubmit = e => {
    e.preventDefault();
    // addHabit() sends the new habit to the server
    this.props.addHabit(this.state.habit);
    // Resets the add habit form to blank
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

AddHabit.propTypes = {
  addHabit: PropTypes.func.isRequired
}

export default AddHabit;
