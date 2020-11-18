import axios from "axios";

class Home {
  constructor() {
    this.home = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  home() {
    return this.home.get("/").then(({ data }) => data);
  }

}

const axiosRequestFunctions = new Home();

export default axiosRequestFunctions;