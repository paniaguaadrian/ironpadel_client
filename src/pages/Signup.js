import React, { Component } from "react";
import { Link } from "react-router-dom";

// Auth
import { withAuth } from "../lib/AuthProvider";

// Css
import "./auth.css";

class Signup extends Component {
  state = { username: "", password: "", email: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;

    this.props.signup({ username, password, email });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <div className="auth_container">
        <h1>Sign Up</h1>
        <div className="form_container">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form_part">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Rafael Nadal"
                onChange={this.handleChange}
              />
            </div>
            <div className="form_part">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="vamosrafa@gmail.com"
                onChange={this.handleChange}
              />
            </div>
            <div className="form_part">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="*************"
                onChange={this.handleChange}
              />
            </div>
            <div className="form_button_container">
              <input className="form_button_btn" type="submit" value="Signup" />
            </div>
          </form>
          <p className="Already_acc">
            Already have account?{" "}
            <Link className="Already_acc_link" to={"/login"}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
