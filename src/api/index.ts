import axios from "axios";

let instace = axios.create({
  baseURL: "http://localhost:3333/",
});

export default instace