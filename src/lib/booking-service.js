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
        const res = await this.booking.get("/booking")
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  addBooking = async (name, date, hour) => {
    try {
        const res = await this.booking.post("/booking", name, date, hour)
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  // editCourt = async (theCourt) => {
  //   try {
  //       const id = theCourt.id
  //       const res = await this.court.put("/booking/:id", id)
  //       return res.data
  //   } catch (error) {
  //       console.log(error)
  //   } 
  // }

  // ! WE NEED TO ADD DELETE

}

const axiosRequestFunctions = new Booking();

export default axiosRequestFunctions;