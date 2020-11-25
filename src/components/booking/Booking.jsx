import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

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
    available: [],
  };

  componentDidMount = async () => {
    const dates = await this.props.getDates();
    console.log(dates);
    this.setState({
      dates: dates,
      available: dates.available,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, date, hour, player2, player3, player4 } = this.state;
    const participants = [this.props.user.username];
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

    this.props.makeBooking({ name, date, hour, participants });
    this.setState({
      name: "",
      date: {},
      participants: [],
      dates: [],
      month: "November",
      hour: "",
      day: 0,
    });

    // setTimeout(() => {
    //   this.props.history.push("/");
    // }, 1500);

    this.props.history.push("/");
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
    const { name, month } = this.state;
    return (
      <div className="auth_container">
        <h1>Book your match</h1>
        <div className="form_container">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form_part">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Pachanguita Domingo"
                onChange={this.handleChange}
              />
            </div>
            <div className="form_part_date">
              <label>Month:</label>
              <select>
                <option name="month" value={month}>
                  November
                </option>
              </select>
            </div>
            <div className="form_part_date">
              <label>Day:</label>
              <select onChange={(e) => this.getDay(e)}>
                <option>-</option>
                {this.state.dates.map(function (date) {
                  return (
                    <option name="day" value={date.day}>
                      {date.day}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form_part_date">
              <label>Time:</label>
              <select onChange={(e) => this.getHour(e)}>
                <option>-</option>
                {this.state.date.available
                  ? this.state.date.available.map(function (hour) {
                      return (
                        <option name="hour" value={hour}>
                          {hour}
                        </option>
                      );
                    })
                  : this.state.dates.length !== 0 &&
                    this.state.dates[0].available.map(function (hour) {
                      return (
                        <option name="hour" value={hour}>
                          {hour}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div>
              <h2>Select your players</h2>
              <div className="form_part">
                <label>Player #2</label>
                <input
                  type="text"
                  name="player2"
                  placeholder="Write user email here"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form_part">
                <label>Player #3</label>
                <input
                  type="text"
                  name="player3"
                  placeholder="Write user email here"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form_part">
                <label>Player #4</label>
                <input
                  type="text"
                  name="player4"
                  placeholder="Write user email here"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form_button_container">
              <input
                className="form_button_btn"
                type="submit"
                value="Booking"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Booking);
