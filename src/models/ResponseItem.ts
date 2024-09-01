import type PlayerItem from "@/models/PlayerItem";

export default interface ResponseItem {
	get: string;
	parameters: {};
	errors: [];
	results: number;
	paging: {};
	response: PlayerItem[];
}
