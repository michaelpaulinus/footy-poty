import db from "@/services/firebaseConn";
import { getDataService } from "@/services/GetDataService";
import { collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import leagues from "@/data/leagues";

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
  const playerData = await getDataService.getTopScorersApi(seasonId, leagueId);

  const playersRef = collection(
    db,
    `leagues/${leagueId}/seasons/${seasonId}/players`
  );

  const playersSnapshot = await getDocs(playersRef);

  playersSnapshot.forEach(async (playerDoc) => {
    await setDoc(playerDoc.ref, playerData);
  });
}

async function updateSeason(leagueId: number, seasonId: number) {
  await deletePlayersInSeason(leagueId, seasonId);
  await addPlayersInSeason(leagueId, seasonId);
}

const seasonId = new Date().getFullYear() - 1;

leagues.forEach(async (league) => {
  updateSeason(league.value, seasonId);
});
