import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

class Profile extends Component {

    state ={
        user: {}
    }

    componentDidMount = async () =>{
        const {params} = this.props.match
        const theUser = await this.props.getProfile(params.id)
        console.log(theUser, 'this is the user' )
        this.setState({
            user: theUser
        })
    }
  render() {
    return (
      <div>
          <h1>{this.state.user.username}</h1>
      </div>
    );
  }
}

export default withAuth(Profile);
