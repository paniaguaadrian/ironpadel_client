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

  render() {
    const { name, id } = this.state;
    const { user } = this.props;
    const props = this.props;
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
                          <button
                            onClick={() =>
                              bookingservice.deletePlayer(player._id, id)
                            }
                          >
                            Delete this player
                          </button>
                        </div>
                      );
                    })
                  : null}
                {/* {this.state.participants.length === 1 ? 
     <div>
    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+1}`}  onChange={this.handleChange}/>
   
    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+2}`}  onChange={this.handleChange}/>

    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+3}`}  onChange={this.handleChange}/>
    </div>
    : null}
  {this.state.participants.length === 2 ? 
     <div>
    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+1}`}/>
   
    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+2}`}/>
    </div>
    : null}
    {this.state.participants.length === 3 ? 
     <div>
    <label>Add another player: </label>
    <input type="text" name={`player${this.state.participants.length+1}`}/>
    </div>
    : null} */}
                <div className="form_button_container_edit">
                  <input
                    className="form_button_btn_edit"
                    type="submit"
                    value="Edit"
                  />
                </div>
              </form>
              <button
                className="form_button_btn_edit_delete"
                onClick={() => bookingservice.deleteBooking(id)}
              >
                Delete this game
              </button>
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
                                onClick={() =>
                                  bookingservice.deletePlayer(player._id, id)
                                }
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

              {this.state.participants.length === 1 ? (
                <div>
                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
                  >
                    Join this game
                  </button>

                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
                  >
                    Join this game
                  </button>

                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
                  >
                    Join this game
                  </button>
                </div>
              ) : null}
              {this.state.participants.length === 2 ? (
                <div>
                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
                  >
                    Join this game
                  </button>
                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
                  >
                    Join this game
                  </button>
                </div>
              ) : null}
              {this.state.participants.length === 3 ? (
                <div>
                  <button
                    className="form_button_btn_edit"
                    onClick={() => bookingservice.addPlayer(user._id, id)}
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
