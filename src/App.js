import React, { Component } from "react";
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
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/habits" component={Header} />
          <div className="main">
            <Route exact path="/habits/login" component={CredentialsView} />
            <Route path="/habits/home" component={HomeView} />
          </div>
        <Route path="/habits" component={Footer} />
        <Route path="/home" component={MobileFooter} />
      </div>
    );
  }
}

export default withRouter(App);
