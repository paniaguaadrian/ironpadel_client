import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import bookingservice from "../lib/booking-service";

class Home extends Component {
  state = {
    user: {},
    bookings: [],
    notifications: [],
  };

  componentDidMount = async () => {
    const theUser = await this.props.getUserBookings();
    const theBookings = await this.props.getUserGames();

    this.setState({
      user: theUser.data,
      // !
      bookings: theBookings,
      notifications: theUser.data.notifications,
    });
  };

  deleteTheBooking = async (id) => {
    await bookingservice.deleteBooking(id);
  };

  render() {
    return (
      <>
        {this.props.isLoggedin ? (
          <div>
            <h1>{this.props.user.username}</h1>
            {this.state.bookings && this.state.bookings.length !== 0
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
                            return (
                              <p key={index}>
                                <Link to={`/profile/${player._id}`}>
                                  {player.username}
                                </Link>
                              </p>
                            );
                          })
                        : null}
                      <Link to={`/booking/${booking._id}`}>Edit booking</Link>
                    </div>
                  );
                })
              : null}
            <div>
              <h1>My notifications</h1>
              {this.state.notifications.length !== 0
                ? this.state.notifications.map(function (notification) {
                    return <p>{notification.message}</p>;
                  })
                : null}
            </div>
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
