import type ResponseItem from "../models/ResponseItem";
import type PlayerItem from "../models/PlayerItem";
import { httpClient } from "./baseHttpClient";
import db from "./firebaseConn";
import { collection, getDocs, query } from "firebase/firestore";

class GetDataService {
	async getTopScorersApi(seasonId: number, leagueId: number) {
		return (
			await httpClient.get<ResponseItem>(
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

		const players = querySnapshot.docs.map<PlayerItem>(
			(doc) => doc.data() as PlayerItem
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
		return (await httpClient.get(`leagues/seasons`)).data.response;
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
