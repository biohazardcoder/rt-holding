import axios from "axios";


export const Fetch = axios.create({
  // baseURL: "https://rt-holdings-api.onrender.com/api/",
  baseURL: "http://localhost:4000/api/",
});
