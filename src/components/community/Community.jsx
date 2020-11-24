import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import communityservice from "../../lib/community-service";

class Community extends Component {
  state = {
    bookings: [],
  };

  getAllBookings = async () => {
    const theBookings = await communityservice.getCommunity();
    console.log(theBookings, "this is bookings data!!");
    this.setState({
      bookings: theBookings.data,
    });
  };

  componentDidMount = async () => {
    this.getAllBookings();
  };

  render() {
    const bookings = this.state.bookings;

    return (
      <div>
        <h1>Welcome to the Community</h1>
        <div>
          {bookings
            ? bookings.map((booking, index) => {
                return (
                  <div key={index}>
                    <h3>{booking.name}</h3>
                    <p>
                      {booking.date.month} {booking.date.day} {booking.hour}
                    </p>
                    <div>
                      {booking.players
                        ? booking.players.map((player, index) => {
                            return(index === 0 || index === 2 ?  <h4 key={index} >{player.username}</h4>
                            : <h4 key={index} >{player.username}</h4>)
                          })
                        : null}
                    </div>
                    <Link to={`/booking/${booking._id}`}>Get details</Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default withAuth(Community);
