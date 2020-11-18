import axios from "axios";

class Court {
  constructor() {
    this.court = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  getCourts = async () => {
    try {
        const res = await this.court.get("/courts")
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  addCourts = async (newCourt) => {
    try {
        const res = await this.court.post("/courts", newCourt)
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  editCourt = async (theCourt) => {
    try {
        const id = theCourt.id
        const res = await this.court.put("/courts/:id", id)
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  // ! WE NEED TO ADD DELETE

}

const axiosRequestFunctions = new Court();

export default axiosRequestFunctions;