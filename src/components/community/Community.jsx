import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import communityservice from "../../lib/community-service";

// CSS
import "./Community.css";

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
      <div className="community_container">
        <h1>Welcome to the Community</h1>
        <div className="wrapp_matches_container">
          {bookings
            ? bookings.map((booking, index) => {
                return (
                  <div className="each_booking_community" key={index}>
                    <h3>{booking.name}</h3>
                    <p>
                      {booking.date.month} {booking.date.day} {booking.hour}
                    </p>
                    <div className="court_container">
                      {booking.players
                        ? booking.players.map((player, index) => {
                            return (booking.players.length >= 2 &&
                              index === 0) ||
                              (booking.players.length >= 2 && index === 2) ? (
                              <h4
                                key={index}
                                style={{
                                  borderRight: "3.5px solid white",
                                }}
                              >
                                {player.username}
                              </h4>
                            ) : (
                              <h4
                                key={index}
                                // style={{ borderLeft: “5px solid red” }}
                              >
                                {player.username}
                              </h4>
                            );
                          })
                        : null}
                    </div>
                    <Link
                      className="button_details"
                      to={`/booking/${booking._id}`}
                    >
                      Get details
                    </Link>
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
