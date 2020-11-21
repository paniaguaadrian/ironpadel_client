import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import editservice from "../../lib/profile-service";

class Profile extends Component {
  state = {
    user: {},
    username: '',
    description: '',
    image: ''
  };

  getTheUser= async() => {
    const { params } = this.props.match;
    const theUser = await this.props.getProfile(params.id);

    this.setState({
      user: theUser,
    });
  }

  componentDidMount = async () => {
    this.getTheUser()
  };

  handleChange = async(e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { username, email, description } = this.state;
      const { id } = this.props.match.params;
      await editservice.editProfile({ username, email, description, id});
      console.log(username, 'this is the users name')
      this.setState({
        username: "",
      });
    } catch (error) {
      console.log(error, "the error originated here");
    }
  };


  render() {
    console.log(this.props.user, 'this is the user')
    console.log(this.state.user, 'this is the user profile')
    return (
      <div>
      {this.state.user !== undefined && this.props.user._id == this.state.user._id ?
      (<div>
      <img src='/default-profile.jpg' alt="" style= {{width: 100}}/>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="username"
            // !
            value={this.state.username}
            placeholder={this.state.user.username}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            // !
            value={this.state.email}
            placeholder={this.state.user.email}
            onChange={(e) => this.handleChange(e)}
          /><label>Description:</label>
          <textarea
            type="text"
            name="description"
            // !
            value={this.state.description}
            placeholder={this.state.user.description}
            onChange={(e) => this.handleChange(e)}
          />

           <input type="submit" value="Edit" />
          </form>
        </div>) : (<div>
          <img src='/default-profile.jpg' alt="" style= {{width: 100}}/>
        <h1>{this.state.user.username}</h1>
        <p>{this.state.user.description}</p>
       
        </div>)}
        
      </div>
    );
  }
}

export default withAuth(Profile);
