import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import bookingservice from "../../lib/booking-service";

// CSS
import "./Booking.css";

class Booking extends Component {
  state = {
    name: "",
    date: {},
    participants: [],
    dates: [],
    month: "November",
    hour: "",
    day: 0,
    player2: "",
    player3: "",
    player4: "",
    booking: {},
    id: "",
    count: 0,
    wasDeleted: false,
    gameDeleted: false,
    wasAdded: false,
  };

  getBooking = async () => {
    const { params } = this.props.match;
    // const dates = await this.props.getDates();
    const theBooking = await bookingservice.getBooking(params.id);
    this.setState({
      booking: theBooking,
      id: params.id,
      participants: theBooking.players,
    });
  };

  componentDidMount = async () => {
    this.getBooking();
    this.setState({
      count: this.state.participants.length,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { name, participants, player2, player3, player4, id } = this.state;
      if (player2 !== "") {
        participants.push(player2);
      }
      if (player3 !== "") {
        participants.push(player3);
      }
      if (player4 !== "") {
        participants.push(player4);
      }

      this.setState({ participants: participants });
      await bookingservice.editBooking({ name, participants, id });
      this.setState({
        name: "",
      });
    } catch (error) {
      console.log(error, "the error originated here");
    }
  };

  getDay = (event) => {
    const day = Number(event.target.value);

    const theDate = this.state.dates.find((datos) => datos.day === day);

    this.setState({
      date: theDate,
      day: day,
    });
  };

  getHour = (event) => {
    const hour = event.target.value;

    this.setState({
      hour: hour,
    });
  };

  addPlayer = (player, booking) => {
    bookingservice.addPlayer(player, booking);
    this.setState({
      wasAdded: true,
    });
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  };

  deletePlayer = (player, booking) => {
    bookingservice.deletePlayer(player, booking);
    this.setState({
      wasDeleted: true,
    });
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  };

  deleteGame = (booking) => {
    bookingservice.deleteBooking(booking);
    this.setState({
      gameDeleted: true,
    });
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { name, id, wasDeleted, gameDeleted, wasAdded } = this.state;
    const { user } = this.props;
    const removePlayer = this.deletePlayer;
    const removeGame = this.deleteGame;
    const joinThisGame = this.addPlayer;
    return (
      <div>
        {this.state.participants.length !== 0 &&
        this.props.user._id == this.state.participants[0]._id ? (
          <div className="auth_container">
            <h1>Edit your match</h1>
            <div className="form_container">
              <form onSubmit={this.handleFormSubmit}>
                <div className="form_part">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    // !
                    value={name}
                    placeholder={this.state.booking.name}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.booking.date ? (
                  <div>
                    <h3>
                      {this.state.booking.date.day}{" "}
                      {this.state.booking.date.month} {this.state.booking.hour}
                    </h3>
                  </div>
                ) : null}

                {this.state.participants !== 0
                  ? this.state.participants.map(function (player, index) {
                      return (
                        <div className="form_participants_edit">
                          <h3>
                            Player {index + 1}: {player.username}
                          </h3>
                          <button onClick={() => removePlayer(player._id, id)}>
                            Delete this player
                          </button>
                        </div>
                      );
                    })
                  : null}

                <div className="form_button_container_edit">
                  {wasDeleted ? <p>Player was removed succesfully!</p> : null}
                  <input
                    className="form_button_btn_edit"
                    type="submit"
                    value="Edit"
                  />
                </div>
              </form>
              <button
                className="form_button_btn_edit_delete"
                onClick={() => removeGame(id)}
              >
                Delete this game
              </button>
              {gameDeleted ? (
                <p>{this.state.booking.name} was cancelled successfully!</p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="auth_container">
            <h1>Checkout this match</h1>
            <div className="form_container">
              <div className="form_firstPart">
                <h3>
                  Name: <span>{this.state.booking.name} </span>
                </h3>
                {this.state.booking.date ? (
                  <div className="form_dates">
                    <h3>
                      {this.state.booking.date.day}{" "}
                      {this.state.booking.date.month} {this.state.booking.hour}
                    </h3>
                  </div>
                ) : null}
              </div>

              <div className="form_participants">
                {this.state.participants !== 0
                  ? this.state.participants.map(function (player, index) {
                      return (
                        <div key={index}>
                          {user.username == player.username ? (
                            <div className="form_eachparticipant">
                              <h3>
                                Player {index + 1}: {player.username}
                              </h3>
                              <button
                                className="delete-btn"
<<<<<<< HEAD
                                onClick={() =>
                                  removePlayer(player._id, id)
                                }
=======
                                onClick={() => removePlayer(player._id, id)}
>>>>>>> branch-adrian
                              >
                                <i class="fas fa-times delete-me"></i>
                              </button>
                            </div>
                          ) : (
                            <div className="form_eachparticipant">
                              <h3>
                                Player {index + 1}: {player.username}
                              </h3>
                            </div>
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
              {this.state.participants.length < 4 ? (
                <div>
                  {wasAdded ? (
                    <p>You have been added to this game succesfully!</p>
                  ) : null}
                  <button
                    className="form_button_btn_edit"
                    onClick={() => joinThisGame(user._id, id)}
                  >
                    Join this game
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withAuth(Booking);
