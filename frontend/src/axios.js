import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://ecombackend-3km3.onrender.com",
});

export default instance;
