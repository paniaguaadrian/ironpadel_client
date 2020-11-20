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
import Booking from "./components/booking/Booking";
import EditBooking from "./components/booking/EditBooking";
import Community from "./components/community/Community";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/community" component={Community} />
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/booking" component={Booking} />
            <PrivateRoute exact path="/booking/:id" component={EditBooking} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
