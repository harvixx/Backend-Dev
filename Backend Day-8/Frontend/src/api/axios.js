import axios from "axios";

const instance = axios.create({
  baseURL: "/",          // Vite proxy use karega
  withCredentials: true // cookies / session ke liye
});

export default instance;
