import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecombackend-3km3.onrender.com",
});

export default instance;
