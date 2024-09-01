import type Player from "./Player";

export default interface ResponseItem {
	get: string;
	parameters: {};
	errors: [];
	results: number;
	paging: {};
	response: Player[];
}
