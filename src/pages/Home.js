import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {
  state = {
    user: {},
    bookings: [],
  };

  componentDidMount = async () => {
    const theUser = await this.props.getUserBookings();
    const theBookings = await this.props.getUserGames();

    this.setState({
      user: theUser.data,
      // !
      bookings: theBookings,
    });
  };

  render() {
    return (
      <>
        {this.props.isLoggedin ? (
          <div>
            <h1>Welcome back {this.props.user.username}</h1>
            <h4>Let's start by booking a game!</h4>
            {this.state.bookings
              ? this.state.bookings.map(function (booking, index) {
                  return (
                    <div key={index}>
                      <h3>{booking.name}</h3>
                      <p>
                        Date: {booking.date.day} {booking.date.month}
                      </p>
                      <p>Hour: {booking.hour}</p>
                      {booking.players
                        ? booking.players.map((player, index) => {
                            return <p key={index}>{player.username}</p>;
                          })
                        : null}
                      <Link to={`/booking/${booking._id}`}>Edit booking</Link>
                    </div>
                  );
                })
              : null}
            <Link to={`/profile/${this.props.user._id}`}>
              {" "}
              Go to my profile{" "}
            </Link>
            <Link to={`/booking`}> Book a match </Link>
            <Link to={`/community`}> Enter to the community </Link>
          </div>
        ) : (
          <div>This is home without log in</div>
        )}
      </>
    );
  }
}
// 6 lineas de código
export default withAuth(Home);
