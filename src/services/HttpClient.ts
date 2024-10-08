import axios from "axios";

const configAPI = {
	baseURL: "https://v3.football.api-sports.io/",
	headers: {
		Accept: "application/json; charset=utf-8",
		"Content-Type": "application/json; charset=utf-8",
		"x-apisports-key": import.meta.env
			? import.meta.env.VITE_X_APISPORTS_KEY
			: process.env.VITE_X_APISPORTS_KEY,
	},
};

export default axios.create(configAPI);
