import axios from "axios";
const baseURL = "https://api.mealviewer.com/api/v4";
const mv = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

export default mv;
