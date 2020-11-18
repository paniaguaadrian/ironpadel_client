import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// * Auth
import AuthProvider from "./lib/AuthProvider";

//* Routes
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

// * Css
import "./App.css";

// * Components
import Navbar from "./components/Navbar";

// * Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
