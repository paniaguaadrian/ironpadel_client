import axios from "axios";


class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
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

  editProfile = async ({username, email, description, id}) => {
    try {
        const res = await this.profile.post(`/profile/${id}`, {username, email, description})
        console.log(username, 'this is the users name service')
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

}

const axiosRequestFunctions = new Profile();

export default axiosRequestFunctions;