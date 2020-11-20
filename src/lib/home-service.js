import axios from "axios";

class Home {
  constructor() {
    this.home = axios.create({
      baseURL: "http://localhost:4000",
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
}

const axiosRequestFunctions = new Home();

export default axiosRequestFunctions;
