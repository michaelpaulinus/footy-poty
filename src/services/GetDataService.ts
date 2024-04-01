import { httpClient } from "@/services/baseHttpClient";
import type ResponseItem from "@/interfaces/ResponseItem";

class GetDataService {
  getTopScorers(seasonId: number, leagueId: number) {
    return httpClient.get<ResponseItem>(
      `players/topscorers?season=${seasonId}&league=${leagueId}`
    );
  }

  getTopAssists(seasonId: number, leagueId: number) {
    return httpClient.get<ResponseItem>(
      `players/topassists?season=${seasonId}&league=${leagueId}`
    );
  }

  getSeasons() {
    return httpClient.get(`leagues/seasons`).then((response) => {
      return response.data.response;
    });
  }
}

export const getDataService = new GetDataService();
