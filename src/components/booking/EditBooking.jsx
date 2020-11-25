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
    declaredWinners: false,
    winner1: {},
    winner2: {},
  };

  getBooking = async () => {
    const { params } = this.props.match;
    // const dates = await this.props.getDates();
    const theBooking = await bookingservice.getBooking(params.id);
    this.setState({
      booking: theBooking,
      id: params.id,
      participants: theBooking.players,
      name: theBooking.name,
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
      const { name, id } = this.state;

      await bookingservice.editBooking({ name, id });
      this.setState({
        name: "",
      });
      this.props.history.push("/");
    } catch (error) {
      console.log(error, "the error originated here");
    }
  };

  handleWinners = async (event) => {
    try {
      event.preventDefault();
      const { winner1, winner2, id } = this.state;
      console.log(winner1);
      console.log(winner2);
      console.log(id);
      await bookingservice.declareWinners({ winner1, winner2 }, id);
      this.setState({
        winner1,
        winner2,
        declaredWinners: true,
      });
      this.getBooking();
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

  getWinnerOne = (event) => {
    const winnerOne = event.target.value;

    this.setState({
      winner1: winnerOne,
    });
  };

  getWinnerTwo = (event) => {
    const winnerTwo = event.target.value;

    this.setState({
      winner2: winnerTwo,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { name, id, wasDeleted, gameDeleted, wasAdded, booking } = this.state;
    const { user } = this.props;
    const removePlayer = this.deletePlayer;
    const removeGame = this.deleteGame;
    const joinThisGame = this.addPlayer;
    // const winners = []
    // if(booking.players){
    //   booking.players.filter((player) => {
    //   if(player._id === this.state.winner1 || player._id === this.state.winner2){
    //     winners.push(player)
    //   }
    // })}
    return (
      <div>
        {this.state.participants.length !== 0 &&
        this.props.user._id == this.state.participants[0]._id ? (
          <div className="auth_container">
            <h1>Edit your match</h1>
            <div className="form_container_4">
              <form onSubmit={this.handleFormSubmit}>
                <div className="form_part">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    // placeholder={this.state.booking.name}
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
                      return index === 0 ? (
                        <div className="form_participants_edit">
                          <h3>Creator: {player.username}</h3>
                        </div>
                      ) : (
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
              <div>
                {this.state.booking.winners.length !== 0 ? (
                  <div>
                    <h3>Winners: </h3>
                    {booking.winners.map((winner) => {
                      return <h3>{winner.username}</h3>;
                    })}
                  </div>
                ) : (
                  <form onSubmit={this.handleWinners}>
                    <div className="form_part_2">
                      <label>Winner 1:</label>
                      <select onChange={(e) => this.getWinnerOne(e)}>
                        <option>-</option>
                        {this.state.participants
                          ? this.state.participants.map(function (player) {
                              return (
                                <option name="winner1" value={player._id}>
                                  {player.username}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                    <div className="form_part_2">
                      <label>Winner 2:</label>
                      <select onChange={(e) => this.getWinnerTwo(e)}>
                        <option>-</option>
                        {this.state.participants
                          ? this.state.participants.map(function (player) {
                              return (
                                <option name="winner2" value={player._id}>
                                  {player.username}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                    <input
                      className="form_button_btn_2"
                      type="submit"
                      value="Declare winners"
                    />
                  </form>
                )}
              </div>
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
            <div className="form_container_2">
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
                                onClick={() => removePlayer(player._id, id)}
                              >
                                <i class="fas fa-times delete-me"></i>
                              </button>
                            </div>
                          ) : index === 0 ? (
                            <div className="form_eachparticipant">
                              <h3>Creator: {player.username}</h3>
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
