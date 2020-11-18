import axios from "axios";

class Community {
  constructor() {
    this.community = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  community() {
    return this.community.get("/community").then(({ data }) => data);
  }

}

// ! DRY possible repetition with court-service
const axiosRequestFunctions = new Community();

export default axiosRequestFunctions;