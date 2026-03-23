import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
    baseURL: "https://rt-holdings-api.onrender.com/api/",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
