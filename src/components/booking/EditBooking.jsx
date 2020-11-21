import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import bookingservice from "../../lib/booking-service";

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
    count: 0
  };

  getBooking = async () => {
    const { params } = this.props.match;
    // const dates = await this.props.getDates();
    const theBooking = await bookingservice.getBooking(params.id);
    console.log(theBooking, "this is the booking!!!!");
    this.setState({
      booking: theBooking,
      id: params.id,
      participants: theBooking.players,

    });
  };

  componentDidMount = async () => {
    this.getBooking();
    this.setState({
      count: this.state.participants.length
    })
  };

  // deleteTheBooking = async(id) => {
  //   await bookingservice.deleteBooking(id)
  // }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { name, id } = this.state;
      console.log(id, "this is the id");
      await bookingservice.editBooking({ name, id });
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
    const { name, month } = this.state;
    console.log(this.state.booking, 'this is the booking')
    console.log(this.state.participants.length, 'these are the number of participants')
    return (
      <div>
        <h1>Edit your match</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            // !
            value={name}
            placeholder={this.state.booking.name}
            onChange={this.handleChange}
          />
          {this.state.booking.date ?
          <div>
          <h3>{this.state.booking.date.day} {this.state.booking.date.month} {this.state.booking.hour}</h3>
          </div> : null}
          
          {this.state.participants !== 0 ? this.state.participants.map(function (player, index){
             return <h3>Player {index + 1}: {player.username}</h3>
          }) : null }
          {this.state.participants.length === 1 ? 
             <div>
            <label>Add another player: </label>
            <input type="text" name={`player${this.state.participants.length+1}`}/>
           
            <label>Add another player: </label>
            <input type="text" name={`player${this.state.participants.length+2}`}/>

            <label>Add another player: </label>
            <input type="text" name={`player${this.state.participants.length+3}`}/>
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
            : null}
          {/* <button onClick={this.deleteTheBooking(this.state.id)}>Delete booking</button> */}

          {/* <label>Month:</label>
          <select>
            <option name="month" value={month}>
              November
            </option>
          </select>

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
          <label>Time:</label>
          <select onChange={(e) => this.getHour(e)}>
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
          </select> */}
          {/* <div>
            <h2>Select your players</h2>
            <label>Player #2</label>
            <input
              type="text"
              name="player2"
              placeholder="Write user email here"
              onChange={this.handleChange}
            />
            <label>Player #3</label>
            <input
              type="text"
              name="player3"
              placeholder="Write user email here"
              onChange={this.handleChange}
            />
            <label>Player #4</label>
            <input
              type="text"
              name="player4"
              placeholder="Write user email here"
              onChange={this.handleChange}
            />
          </div> */}

          <input type="submit" value="Edit" />
        </form>
      </div>
    );
  }
}

export default withAuth(Booking);
