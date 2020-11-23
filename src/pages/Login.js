import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login({ username, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div className="auth_container">
          <h1>Log In</h1>
          <div className="form_container">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form_part">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form_part">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form_button_container">
                <input
                  className="form_button_btn"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="Already_acc">
              Don't have an account?{" "}
              <Link className="Already_acc_link" to={"/signup"}>
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
