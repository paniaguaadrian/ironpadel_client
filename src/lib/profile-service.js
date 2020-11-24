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
  handleUpload = async (theFile) => {
    console.log("file in service: ", theFile);

    try {
      const res = await this.profile.post("/profile/uploadpicture", theFile);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  editProfile = async ({username, email, description, image, id}) => {
    try {
        const res = await this.profile.post(`/profile/${id}`, {username, email, description, image})
        return res.data
    } catch (error) {
        console.log(error)
    } 
  }

}

const axiosRequestFunctions = new Profile();

export default axiosRequestFunctions;