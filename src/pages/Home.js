import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import bookingservice from "../lib/booking-service";
import homeservice from "../lib/home-service";

// Components
import CTANewUsers from "../components/ctaNewUsers/CTANewUsers";
import CTABooking from "../components/ctaBooking/CTABooking";
import CTACommunity from "../components/CTACommunity/CTACommunity";

import "./Home.css";

class Home extends Component {
  state = {
    user: {},
    bookings: [],
    notifications: [],
  };

  getInfo = async()  => {
    const theUser = await this.props.getUserBookings();
    const theBookings = await this.props.getUserGames();

    this.setState({
      user: theUser.data,
      bookings: theBookings,
      notifications: theUser.data.notifications.reverse(),
    });
  }

  componentDidMount = () => {
    this.getInfo()
  };

  // componentDidUpdate = () => {
  //   this.getInfo()
  // }

  deleteTheBooking = async (id) => {
    await bookingservice.deleteBooking(id);
  };

  deleteTheNews = async (id) => {
    await homeservice.deleteNotification(id)
  }

  render() {
    const {deleteTheNews} = this
    return (
      <div className="Home_Section">
        {this.props.isLoggedin ? (
          <div>
            <h1 className="Welcome_title">
              <i class="fas fa-baseball-ball App-logo"></i> Welcome{" "}
              {this.state.user.username}!
            </h1>

            <div className="Bookings_container">
              <h1>Next Matches</h1>
              {this.state.bookings && this.state.bookings.length !== 0
                ? this.state.bookings.map(function (booking, index) {
                    return (
                      <div className="Booking_user_container" key={index}>
                        <div className="Booking_general_info">
                          <h3>{booking.name}</h3>
                          <p>
                            {booking.date.day} {booking.date.month}{" "}
                            {booking.hour}
                          </p>
                        </div>
                        <div className="Booking_players">
                          {booking.players
                            ? booking.players.map((player, index) => {
                                return (
                                  <div>
                                    <img
                                      src={player.image}
                                      style={{ width: 25 }}
                                      alt=""
                                    />
                                    <p key={index}>
                                      <Link
                                        className="players_participants"
                                        to={`/profile/${player._id}`}
                                      >
                                        {player.username}
                                      </Link>
                                    </p>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                        <div className="button_container">
                          <Link
                            className="editBooking_link"
                            to={`/booking/${booking._id}`}
                          >
                            View match
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : <p>Book a match!!</p>}
            </div>

            <div>
              <div className="Notifications_container">
                <h1>Notifications</h1>
                {this.state.notifications.length !== 0
                  ? this.state.notifications.map(function (notification) {
                      return (notification.booking ?
                        <div className="Notification_container">
                        <Link to={`booking/${notification.booking}`}><p>{notification.message}</p></Link>
                          <button onClick={() => deleteTheNews(notification._id)}><i className="fas fa-times "></i></button>
                        </div> : <div className="Notification_container">
                            <p>{notification.message}</p>
                          <button onClick={() => deleteTheNews(notification._id)}><i className="fas fa-times "></i></button>
                          </div>
                      );
                    })
                    
                  : <div className="Notification_container"> <p>You have no notifications</p> </div>}
              </div>
            </div>
            <CTABooking />
            <CTACommunity />
            {/* <Link to={`/profile/${this.props.user._id}`}>
              {" "}
              Go to my profile{" "}
            </Link>
            <Link to={`/booking`}> Book a match </Link>
            <Link to={`/community`}> Enter to the community </Link> */}
          </div>
        ) : (
          <div className="Home_Section">
            <CTANewUsers />
            <CTABooking />
            <CTACommunity />
          </div>
        )}
      </div>
    );
  }
}
// 6 lineas de código
export default withAuth(Home);
