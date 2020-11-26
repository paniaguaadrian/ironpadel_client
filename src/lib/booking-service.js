import axios from "axios";

class Booking {
  constructor() {
    this.booking = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
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

  editBooking = async ({ id, name }) => {
    try {
      const res = await this.booking.post(`/booking/${id}`, { name });
      return res.data;
    } catch (error) {
      console.log(error);
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

  addPlayer = async (userID, bookingID) => {
    const res = await this.booking.post(
      `/booking/addPlayer/${bookingID}/${userID}`
    );
    return res.data;
  };

  declareWinners = async (winners, id) => {
    const res = await this.booking.post(`/booking/declarewinners/${id}`, {
      winners,
    });

    return res.data;
  };

  // ! WE NEED TO ADD DELETE

  deleteBooking = async (id) => {
    try {
      const res = await this.booking.post(`/booking/${id}/deleteBooking`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  deletePlayer = async (playerId, bookingId) => {
    try {
      const res = await this.booking.post(
        `/booking/deletePlayer/${bookingId}/${playerId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}

const axiosRequestFunctions = new Booking();

export default axiosRequestFunctions;
