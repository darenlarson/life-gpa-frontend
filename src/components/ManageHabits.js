import React from "react";
import PropTypes from 'prop-types';
import ManageHabit from "./ManageHabit";
import AddHabit from "./AddHabit";
// import "./css/ManageHabits.css";
import '../css/index.css';

const ManageHabits = props => {
  return (
    <div>
      <AddHabit addHabit={props.addHabit} />
      {props.habits.map(habit => (
        <ManageHabit
          key={habit.id}
          habit={habit}
          resetData={props.resetData}
          deleteHabit={props.deleteHabit}
        />
      ))}
    </div>
  );
};

ManageHabits.propTypes = {
  habits: PropTypes.array.isRequired,
  resetData: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired,
  addHabit: PropTypes.func.isRequired
}

export default ManageHabits;
