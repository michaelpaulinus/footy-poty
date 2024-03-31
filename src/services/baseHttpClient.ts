import axios from "axios";

const configAPI = {
  baseURL: "https://v3.football.api-sports.io/",
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
    "x-apisports-key": "3d1cabeabeeddea94296722b6eebca2f",
  },
};

const httpClient = axios.create(configAPI);

export { httpClient };
