import axios from "axios";

const instance = axios.create({
  baseURL: "https://resold.netlify.app/",
});

export default instance;