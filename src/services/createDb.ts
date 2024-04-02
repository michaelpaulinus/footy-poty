import db from "@/services/firebaseConn";
import { getDataService } from "@/services/GetDataService";
import { collection, doc, setDoc } from "firebase/firestore";
import leagues from "@/data/leagues";

async function createDb() {
  const leaguesRef = collection(db, "leagues");

  leagues.forEach(async (league) => {
    const leagueDocRef = doc(leaguesRef, league.value.toString());

    await setDoc(leagueDocRef, league);

    const seasonsRef = collection(leagueDocRef, "seasons");

    let seasonsData: number[] = await getDataService.getSeasonsApi();
    seasonsData = seasonsData.filter((val: number) => {
      return val <= new Date().getFullYear() - 1;
    });

    seasonsData.forEach(async (season) => {
      const seasonDocRef = doc(seasonsRef, season.toString());

      await setDoc(seasonDocRef, { season: season });

      const playerData = await getDataService.getTopScorersApi(
        season,
        league.value
      );

      const playerRef = collection(seasonDocRef, "players");

      playerData.forEach(async (player: any) => {
        const playerDocRef = doc(playerRef, player.player.id.toString());
        await setDoc(playerDocRef, player);
      });
    });
  });
}

export default createDb;
