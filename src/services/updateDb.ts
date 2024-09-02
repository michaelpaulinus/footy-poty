import db from "./firebaseConn";
import DataService from "./DataService";
import {
	collection,
	doc,
	getDocs,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import leagues from "../data/leagues";

async function deletePlayersInSeason(leagueId: number, seasonId: number) {
	const playersRef = collection(
		db,
		`leagues/${leagueId}/seasons/${seasonId}/players`
	);

	const playersSnapshot = await getDocs(playersRef);

	playersSnapshot.forEach(async (playerDoc) => {
		await deleteDoc(playerDoc.ref);
	});
}

async function addPlayersInSeason(leagueId: number, seasonId: number) {
	const playerData = await DataService.getTopScorersApi(seasonId, leagueId);

	const playersRef = collection(
		db,
		`leagues/${leagueId}/seasons/${seasonId}/players`
	);

	for (const player of playerData) {
		const playerDocRef = doc(playersRef, player.player.id.toString());
		await setDoc(playerDocRef, player);
	}
}

async function updateSeason(leagueId: number, seasonId: number) {
	await deletePlayersInSeason(leagueId, seasonId);
	await addPlayersInSeason(leagueId, seasonId);
}

let seasonId: number;

if (new Date().getMonth() >= 8) {
	seasonId = new Date().getFullYear();
} else {
	seasonId = new Date().getFullYear() - 1;
}

leagues.forEach(async (league) => {
	await updateSeason(league.value, seasonId);
	console.log(`Updated ${league.name} data for season ${seasonId}.`);
	await new Promise((f) => setTimeout(f, 30000));
});
