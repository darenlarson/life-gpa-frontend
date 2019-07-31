import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { getHabits, addHabit, completeHabit, deleteHabit, resetData } from '../store/actions';
import LifeGPADisplay from "../components/LifeGPADisplay";
import HabitsList from "../components/HabitsList";
import ManageHabits from "../components/ManageHabits";
import '../css/index.css';

import ClipLoader from "react-spinners/ClipLoader";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
      loading: true
    };
  }

  // Fetch habit data as soon as component mounts
  componentDidMount() {
    this.props.getHabits();

    setTimeout( () => {
      this.setState({ loading: false })
    }, 500)
  }

  // Hover event to show description of the life gpa calculation
  showGPADescription = () => {
    setTimeout(() => {this.setState({ showDescription: true })}, 700)
  }

  // Hover event to hide description of the life gpa calculation
  hideGPADescription = () => {
    this.setState({ showDescription: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="homeview-wrapper spinner">
          <ClipLoader sizeUnit={"px"} size={100} color={"#D87B92"} loading={this.state.loading} />
        </div>
      )
    } else {
      return (
        <div className="homeview-wrapper">

          {/* <div onMouseEnter={() => this.showGPADescription()} onMouseLeave={() => this.hideGPADescription()}> */}
          <div>
            <LifeGPADisplay lifeGPA={this.props.totalLifeGPA} />
          </div>

          <div className={`${this.state.showDescription ? "show-description" : "hide-description"}`}>
            <p>LifeGPA is calculated using a complex formula that you wouldn't understand. Don't worry about how we calculate it. Just know that higher is better than lower.</p>
          </div>

          <Route
            exact
            path="/habits/home"
            render={props => (
              <HabitsList
                {...props}
                habits={this.props.habits}
                completeHabit={this.props.completeHabit}
                allCompleted={this.props.allCompleted}
              />
            )}
          />

          <Route
            path="/habits/home/manage-habits"
            render={props => (
              <ManageHabits
                {...props}
                habits={this.props.habits}
                resetData={this.props.resetData}
                deleteHabit={this.props.deleteHabit}
                addHabit={this.props.addHabit}
              />
            )}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    habits: state.habits,
    allCompleted: state.allCompleted,
    totalLifeGPA: state.totalLifeGPA,
  }
}

export default connect(mapStateToProps, { getHabits, addHabit, completeHabit, deleteHabit, resetData })(HomeView);
