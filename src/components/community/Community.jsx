import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import communityservice from "../../lib/community-service";
import profileservice from "../../lib/profile-service";

// CSS
import "./Community.css";

class Community extends Component {
  state = {
    bookings: [],
    users: [],
    firstFive: [],
    firstFiveGames: [],
  };

  getAllBookings = async () => {
    const theBookings = await communityservice.getCommunity();

    const theUsers = await profileservice.getAllUsers();
    const theUsersGames = await profileservice.getAllUsers();

    const orderedUsers = theUsers.sort(function (a, b) {
      if (a.wins > b.wins) {
        return -1;
      } else {
        return 1;
      }
    });

    const orderedUsersGames = theUsersGames.sort(function (a, b) {
      if (a.games > b.games) {
        return -1;
      } else {
        return 1;
      }
    });

    this.setState({
      bookings: theBookings.data,
      users: orderedUsers,
      firstFive: orderedUsers.slice(0, 5),
      firstFiveGames: orderedUsersGames.slice(0, 5),
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
        <div className="community_wrapper">
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
          <div className="ranking_container">
            <h1>Best players on IronPadel</h1>
            <h3>Play more and push to the TOP!</h3>
            <div className="ranking_wrapper">
              <div className="wins_container">
                <h2>Most Wins</h2>
                {this.state.firstFive
                  ? this.state.firstFive.map((user, index) => {
                      return (
                        <div className="each_user_game" key={index}>
                          <p>
                            <Link
                              className="each_user_link"
                              to={`/profile/${user._id}`}
                            >
                              {user.username}
                            </Link>
                          </p>
                          <img src={user.image} alt="" />
                          <p>{user.wins} wins</p>
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="wins_container">
                <h2>Most Games</h2>
                {this.state.firstFiveGames
                  ? this.state.firstFiveGames.map((user, index) => {
                      return (
                        <div className="each_user_game" key={index}>
                          <p>
                            <Link
                              className="each_user_link"
                              to={`/profile/${user._id}`}
                            >
                              {user.username}
                            </Link>
                          </p>
                          <img src={user.image} alt="" />
                          <p>{user.games} games played</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Community);
