import axios from "axios";

class Community {
  constructor() {
    this.community = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  getCommunity = async () => {
    try {
      const theBookings = await this.community.get("/community");
      console.log(theBookings, "these are the bookings!!!!!!");
      return theBookings;
    } catch (error) {
      console.log(error);
    }
  };
}

// ! DRY possible repetition with court-service
const axiosRequestFunctions = new Community();

export default axiosRequestFunctions;
