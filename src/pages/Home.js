import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {
  state = {
    user: {}
  }

  componentDidMount = async () => {
    const theUser = await this.props.getUserBookings()
    console.log(theUser, 'these are all the bookings' )
    this.setState({
      user: theUser.data
    })
  }
  
  render() {
    
    return (
      <>
      {this.props.isLoggedin ? 
      <div>
        <h1>{this.props.user.username}</h1>
        {this.state.user.bookings ? this.state.user.bookings.map(function(booking, index){
          return <div key={index}><h3>{booking.name}</h3> 
          </div>
        }) : null}
        <Link to={`/profile/${this.props.user._id}`}> Go to my profile </Link>
        <Link to={`/booking`}> Book a match </Link>
      </div> 
      : <div>Hello World</div>}
        
      </>
    )
  }
  
}
// 6 lineas de código
export default withAuth(Home);