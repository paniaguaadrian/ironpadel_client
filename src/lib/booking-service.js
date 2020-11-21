import axios from "axios";

class Booking {
  constructor() {
    this.booking = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getDates = async () => {
    try {
      const res = await this.booking.get("/booking");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  addBooking = async (name, date, hour, participants) => {
    try {
      const res = await this.booking.post(
        "/booking",
        name,
        date,
        hour,
        participants
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getUserBookings = async () => {
    try {
      const res = await this.booking.get("/booking/bookings");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  editBooking = async ({ id, name, participants }) => {
    try {
      const res = await this.booking.post(`/booking/${id}`, { name, participants });
      console.log(participants, "again, the participants should be this!!!");
      return res.data;
    } catch (error) {
      console.log(error);
      console.log(id, "again, the id should be this!!!");
    }
  };

  getBooking = async (id) => {
    try {
      const res = await this.booking.get(`/booking/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ! WE NEED TO ADD DELETE

  deleteBooking = async (id) => {
    try {
      console.log(id, 'is this the id???')
      
      const res = await this.booking.post(`/booking/${id}/deleteBooking`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

}

const axiosRequestFunctions = new Booking();

export default axiosRequestFunctions;
