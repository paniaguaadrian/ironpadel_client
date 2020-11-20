import axios from "axios";

class Booking {
  constructor() {
    this.booking = axios.create({
      baseURL: "http://localhost:4000",
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
      console.log(id, "again, the id should be this!!!");
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
}

const axiosRequestFunctions = new Booking();

export default axiosRequestFunctions;
