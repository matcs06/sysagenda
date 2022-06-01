import axios from "axios";

let instace = axios.create({
  baseURL: "https://clickeagenda.arangal.com",
});

export default instace