import React from "react";
import ManageHabit from "./ManageHabit";
import AddHabit from './AddHabit';
import "./css/ManageHabits.css";

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

export default ManageHabits;
