import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {

  state = {
    users: []
  }
  componentDidMount = async () => {
    const allUsers = await this.props.getAllUsers()
    console.log(allUsers, 'these are all the users' )
    this.setState({
      users: allUsers
    })
  }
  render() {
   
    return (
      <>
       {this.state.users.map(function(user, index){
         return <div key={index}>
           <h1>{user.username}</h1>
           <Link to={`/profile/${user._id}`}> Go to my profile </Link>
         </div>
       })}
      </>
    )
  }
  
}
// 6 lineas de código
export default withAuth(Home);