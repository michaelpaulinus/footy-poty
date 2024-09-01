import type Response from "../models/Response";
import type Player from "../models/Player";
import HttpClient from "./HttpClient";
import db from "./firebaseConn";
import { collection, getDocs, query } from "firebase/firestore";

class GetDataService {
	async getTopScorersApi(seasonId: number, leagueId: number) {
		return (
			await HttpClient.get<Response>(
				`players/topscorers?season=${seasonId}&league=${leagueId}`
			)
		).data.response;
	}

	async getTopScorersDb(seasonId: number, leagueId: number) {
		const q = query(
			collection(
				db,
				"leagues",
				leagueId.toString(),
				"seasons",
				seasonId.toString(),
				"players"
			)
		);

		const querySnapshot = await getDocs(q);

		const players = querySnapshot.docs.map<Player>(
			(doc) => doc.data() as Player
		);

		players.sort((a, b) => {
			const goalsA = a.statistics[0]?.goals.total || 0;
			const goalsB = b.statistics[0]?.goals.total || 0;
			const assistsA = a.statistics[0]?.goals.assists || 0;
			const assistsB = b.statistics[0]?.goals.assists || 0;

			if (goalsB !== goalsA) {
				return goalsB - goalsA;
			} else {
				return assistsB - assistsA;
			}
		});

		players.splice(5);

		return players;
	}

	async getSeasonsApi() {
		return (await HttpClient.get(`leagues/seasons`)).data.response;
	}

	async getSeasonsDb(leagueId: number) {
		const q = query(collection(db, "leagues", leagueId.toString(), "seasons"));
		const querySnapshot = await getDocs(q);
		const seasons = querySnapshot.docs.map<number>(
			(doc) => doc.data().season as number
		);
		return seasons;
	}
}

export const getDataService = new GetDataService();
