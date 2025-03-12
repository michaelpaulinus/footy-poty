import axios, { type CreateAxiosDefaults } from 'axios';

// const BACKEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'https://footy-poty-backend.vercel.app';

const configAPI: CreateAxiosDefaults = {
	baseURL: `${BACKEND_URL}/api`,
	headers: {
		Accept: 'application/json; charset=utf-8',
		'Content-Type': 'application/json; charset=utf-8',
	},
};

export default axios.create(configAPI);
