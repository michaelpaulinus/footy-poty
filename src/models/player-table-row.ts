export default interface PlayerTableRow {
	player: { name: string; photo: string };
	team: string;
	position: string;
	appearences: number;
	goals: number;
	assists: number;
	rating: string;
}
