import httpClient from '@/configs/http-client';
import type Player from '@/models/player-dto';

export class StatsService {
	async getTopScorers(seasonId: number, leagueId: number) {
		return httpClient.get<Player[]>(`scorers/${seasonId}/${leagueId}`);
	}

	async getSeasons(leagueId: number) {
		return httpClient.get<number[]>(`seasons/${leagueId}`);
	}
}

export default new StatsService();
