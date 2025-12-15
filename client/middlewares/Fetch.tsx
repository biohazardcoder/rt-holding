import axios from "axios";


export const Fetch = axios.create({
  // baseURL: "https://server.rt-motors.com/api/",
  baseURL: "http://localhost:4000/api/",
});
