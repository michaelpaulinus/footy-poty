import axios from "axios";

const configAPI = {
  baseURL: "https://v3.football.api-sports.io/",
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
    "x-apisports-key": import.meta.env.DEV
      ? import.meta.env.VITE_X_APISPORTS_KEY
      : import.meta.env.X_APISPORTS_KEY,
  },
};

const httpClient = axios.create(configAPI);

export { httpClient };
