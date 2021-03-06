import React from "react";
import { Route, withRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import CredentialsView from "./views/CredentialsView";
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";
import "./css/index.css";
import MobileFooter from "./components/MobileFooter";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/habits" component={Header} />
      <div className="main">
        <Route exact path="/habits/login" component={CredentialsView} />
        <Route path="/habits/home" component={HomeView} />
      </div>
      <Route path="/habits" component={Footer} />
      <Route path="/habits" component={MobileFooter} />
    </div>
  );
};

export default withRouter(App);
