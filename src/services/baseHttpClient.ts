import axios from "axios";

const configAPI = {
  baseURL: "https://v3.football.api-sports.io/",
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
    "x-apisports-key": "257af45136d59ded90a701ff2923a610",
  },
};

const httpClient = axios.create(configAPI);

export { httpClient };
