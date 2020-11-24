import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import editservice from "../../lib/profile-service";

// CSS
import "./Profile.css";
import "../../pages/Home.css";

class Profile extends Component {
  state = {
    user: {},
    username: "",
    description: "",
    image: "",
  };

  getTheUser = async () => {
    const { params } = this.props.match;
    const theUser = await this.props.getProfile(params.id);

    this.setState({
      user: theUser,
    });
  };

  componentDidMount = async () => {
    this.getTheUser();
  };

  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { username, email, description } = this.state;
      const { id } = this.props.match.params;
      await editservice.editProfile({ username, email, description, id });
      console.log(username, "this is the users name");
      this.setState({
        username: "",
      });
    } catch (error) {
      console.log(error, "the error originated here");
    }
  };

  render() {
    console.log(this.props.user, "this is the user");
    console.log(this.state.user, "this is the user profile");
    return (
      <div className="auth_container">
        {this.state.user !== undefined &&
        this.props.user._id == this.state.user._id ? (
          <div className="form_container">
            <img src={this.state.user.image} alt="" style={{ width: 100 }} />
            <form onSubmit={this.handleFormSubmit}>
              <div className="form_part">
                <label>Name:</label>
                <input
                  type="text"
                  name="username"
                  // !
                  value={this.state.username}
                  placeholder={this.state.user.username}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="form_part">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  // !
                  value={this.state.email}
                  placeholder={this.state.user.email}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="form_part">
                <label>Description:</label>
                <textarea
                  type="text"
                  name="description"
                  // !
                  value={this.state.description}
                  placeholder={this.state.user.description}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="form_button_container">
                <input className="form_button_btn" type="submit" value="Edit" />
              </div>
            </form>
          </div>
        ) : (
          <div className="auth_container_profile">
            <div className="form_container_profile">
              <img src={this.state.user.image} alt="" style={{ width: 100 }} />
              <h1>Name: {this.state.user.username}</h1>
              <h4>Email: {this.state.user.email}</h4>
              <h4>Description: {this.state.user.description}</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Profile);
