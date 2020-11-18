import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// * Auth
import AuthProvider from "./lib/AuthProvider";

//* Routes
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";

// * Css
import "./App.css";

// * Components
import Navbar from "./components/fixedComponents/Navbar";

// * Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./components/profile/Profile";

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
            <PrivateRoute exact path="/profile/:id" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
