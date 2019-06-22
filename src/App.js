import React, { Component } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Header from "./components/Header";
import CredentialsView from "./views/CredentialsView";
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";
import "./App.css";
import MobileFooter from "./components/MobileFooter";

// https://life-gpa.herokuapp.com/

class App extends Component {

  // Adds a new user to database
  registerUser = userInfo => {
    axios
      // .post(`http://localhost:5000/api/users/register`, userInfo)
      .post(`https://life-gpa.herokuapp.com//api/users/register`, userInfo)
      .then(res => {
        this.loginUser(userInfo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Logs a user into the application
  loginUser = userInfo => {
    this.setState({ loading: true });

    axios
      // .post(`http://localhost:5000/api/users/login`, userInfo)
      .post(`https://life-gpa.herokuapp.com/api/users/login`, userInfo)
      .then(res => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/habits/home");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Logs user out of app and routes to login screen
  logoutUser = e => {
    e.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/habits" render={props => <Header {...props} logoutUser={this.logoutUser} />} />

          <div className="main">
            <Route exact path="/habits/login" render={props => (<CredentialsView {...props} registerUser={this.registerUser} loginUser={this.loginUser} /> )} />

            <Route path="/habits/home" render={props => <HomeView {...props} />} />
          </div>
        
        <Route path="/habits" component={Footer} />
        <Route path="/home" component={MobileFooter} />
      </div>
    );
  }
}

export default withRouter(App);
