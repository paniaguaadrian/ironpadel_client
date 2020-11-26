import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../../lib/AuthProvider";
import { Button } from "../Button";

// CSS
import "./Navbar.css";
// import logo from "./ironpadel_verde.png";

class Navbar extends Component {
  state = {
    clicked: false,
  };

  // Function to change the icon when clicked
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  logoutMenuClick = () => {
    this.props.logout();
    this.handleClick();
  };

  render() {
    const { isLoggedin } = this.props;
    return (
      <nav className="NavbarItems">
        <Link to={"/"}>
          <img src="/ironpadel_blanco.png" className="ironPadel_logo" alt="" />
        </Link>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        {isLoggedin ? (
          <>
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
              <li className="navbar-link">
                <Link onClick={this.handleClick} className="navbar-text" to="/">
                  Home
                </Link>
              </li>
              <li className="navbar-link">
                <Link
                  onClick={this.handleClick}
                  className="navbar-text"
                  to={`/profile/${this.props.user._id}`}
                >
                  Profile
                </Link>
              </li>

              <li className="navbar-link">
                <Link
                  onClick={this.handleClick}
                  className="navbar-text"
                  to="/booking"
                >
                  Booking
                </Link>
              </li>
              <li className="navbar-link">
                <Link
                  onClick={this.handleClick}
                  className="navbar-text"
                  to="/community"
                >
                  Community
                </Link>
              </li>
              <li className="navbar-link">
                <Button onClick={this.logoutMenuClick}>Log Out</Button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
              <li className="navbar-link">
                <Link className="navbar-text" to="/">
                  Home
                </Link>
              </li>

              <li className="navbar-link">
                <Link className="navbar-text" to="/booking">
                  Booking
                </Link>
              </li>
              <li className="navbar-link">
                <Link className="navbar-text" to="/community">
                  Community
                </Link>
              </li>
              <li className="navbar-link">
                <Link to="/login">
                  <button onClick={this.handleClick} className="navbar-button">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
