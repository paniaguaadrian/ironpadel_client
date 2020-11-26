import axios from "axios";

class Home {
  constructor() {
    this.home = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  homes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/home/main", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  deleteNotification = async (id) => {
    try {
      const res = await this.home.post(`/home/main/notificationDelete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}

const axiosRequestFunctions = new Home();

export default axiosRequestFunctions;
