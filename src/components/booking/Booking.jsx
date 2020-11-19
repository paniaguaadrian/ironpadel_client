import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

class Booking extends Component {

    state = { name: "", 
    date: {}, 
    players: [], 
    dates: [],
    month: "November",
    hour: '',
    day: 0
    };

  componentDidMount = async () => {
      const dates = await this.props.getDates()
      this.setState({
        dates: dates
      })
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, date, hour } = this.state;
    console.log(hour, 'this is the hour')
    console.log("Signup -> form submit", {  name, date, hour  });
    this.props.makeBooking({  name, date, hour  });
    this.setState({
      name: "", 
      date: {}, 
      players: [], 
      dates: [],
      month: "November",
      hour: '',
      day: 0
    })
  };

  getDay = (event) => {
      const day = Number(event.target.value)
    
      const theDate = this.state.dates.find(datos => datos.day === day)
      
      this.setState({
          date: theDate,
          day: day
      })
      
  };

  getHour = (event) => {
    const hour = event.target.value
  
    console.log(hour, "this is the hour")
    
    this.setState({
        hour: hour
    })
    
};

  render() {
    // console.log(this.state.dates ? this.state.dates : null)
    // console.log(this.state.date)
    const { name, month } = this.state;
    return (
      <div>
        <h1>Book your match</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Month:</label>
          <select>
               <option name="month" value={month}>November</option>
          </select>

          <label>Day:</label>
          <select onChange={(e) => this.getDay(e)}>
              <option>-</option>
              {this.state.dates.map(function(date){
                return <option name="day" value={date.day}>{date.day}</option>
              })}
          </select>
          <label>Time:</label>
          <select  onChange={(e) => this.getHour(e)}>
              {this.state.date.available ? this.state.date.available.map(function(hour){
                   return <option name="hour" value={hour}>{hour}</option>
                 }) : this.state.dates.length !== 0 && this.state.dates[0].available.map(function(hour){
                  return <option name="hour" value={hour}>{hour}</option>
                 })}  
          </select>

          <input type="submit" value="Booking" />
        </form>
      </div>
    );
  }
}

export default withAuth(Booking);
