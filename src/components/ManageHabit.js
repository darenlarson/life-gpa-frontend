import React from "react";
// import PropTypes from 'prop-types';
// import "./css/ManageHabit.css";
import '../css/index.css';

const ManageHabit = props => {
  return (
    <div className="manage-habit-wrapper">
      <div className="manage-habit-ctn">
        <div className="primary-info">
          <p className="name">{props.habit.habit_name}</p>
        </div>
        <div className="manage-options">
          <button className="manage-btn">ARCHIVE</button>
          <button className="manage-btn" onClick={() => props.resetData(props.habit)}>RESET</button>
          <button className="manage-btn" onClick={() => props.deleteHabit(props.habit)}>DELETE</button>
        </div>
      </div>
    </div>
  );
};

// ManageHabit.propTypes = {
//   habit: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     habit_name: PropTypes.string.isRequired,
//     user_id: PropTypes.number.isRequired,
//     date_created: PropTypes.string.isRequired,
//     last_completed: PropTypes.string.isRequired
//   }),
//   resetData: PropTypes.func.isRequired,
//   deleteHabit: PropTypes.func.isRequired
// }

export default ManageHabit;
