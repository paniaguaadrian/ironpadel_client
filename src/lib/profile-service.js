import axios from "axios";

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }
  //TO BE CONTINUED

  getAllUsers = async() => {
      try {
        const res = await this.profile.get(`/profile`)
        return res.data
      } catch (error) {
        
      }
  }

  getProfile = async (id) => {
    try {
        const res = await this.profile.get(`/profile/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

  editProfile = async (theUser) => {
    try {
        const res = await this.profile.post("/profile/:id", theUser)
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

}

const axiosRequestFunctions = new Profile();

export default axiosRequestFunctions;