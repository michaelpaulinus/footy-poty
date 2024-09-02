import db from "@/services/firebaseConn";
import DataService from "./DataService";
import { collection, doc, setDoc } from "firebase/firestore";
import leagues from "@/data/leagues";

async function createDb() {
	const leaguesRef = collection(db, "leagues");

	leagues.forEach(async (league) => {
		const leagueDocRef = doc(leaguesRef, league.value.toString());

		await setDoc(leagueDocRef, league);

		const seasonsRef = collection(leagueDocRef, "seasons");

		var seasonsData: number[] = await DataService.getSeasonsApi();
		seasonsData = seasonsData.filter((val: number) => {
			return val <= new Date().getFullYear() - 1 && val >= 2010;
		});

		console.log("Seasons found: ", seasonsData);

		seasonsData.forEach(async (season) => {
			const seasonDocRef = doc(seasonsRef, season.toString());

			await setDoc(seasonDocRef, { season: season });

			const playerData = await DataService.getTopScorersApi(
				season,
				league.value
			);

			const playerRef = collection(seasonDocRef, "players");

			playerData.forEach(async (player: any) => {
				const playerDocRef = doc(playerRef, player.player.id.toString());
				await setDoc(playerDocRef, player);
				console.log("players added");
			});

			console.log("added seasons: ", season);
		});
	});
}

export default createDb;
