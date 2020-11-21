import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";

class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount = async () => {
    const { params } = this.props.match;
    const theUser = await this.props.getProfile(params.id);

    this.setState({
      user: theUser,
    });
  };
  render() {
    return (
      <div>
        <h1>Hello {this.state.user.username}</h1>
        <p>Take a look at your profile!</p>
      </div>
    );
  }
}

export default withAuth(Profile);
