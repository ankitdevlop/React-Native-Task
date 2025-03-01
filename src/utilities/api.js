import axios from "axios";
import { constants } from "./constants";


export const addUrl = (url) => `${url}`;

const api = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
