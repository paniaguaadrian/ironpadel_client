import axios from "axios";

class Home {
  constructor() {
    this.home = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  home = async () => {
    try {
      const res = await this.home.get("/");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  deleteNotification = async (id) => {
    try {
      await this.home.post(`/notificationDelete/${id}`);

    } catch (error) {
      console.log(error);
    }
  };
}

const axiosRequestFunctions = new Home();

export default axiosRequestFunctions;
