import axios from "axios";

let instace = axios.create({
  baseURL: "https://agendaapi.arangal.com/",
});

export default instace