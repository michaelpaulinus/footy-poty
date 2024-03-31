import { httpClient } from '@/services/baseHttpClient'
import type playerItem from '@/interfaces/playerItem'

class GetDataService {
  getTopScorers(seasonId: number, leagueId: number) {
    return httpClient
      .get(`players/topscorers?season=${seasonId}&league=${leagueId}`)
      .then((response) => {
        const playerItems: playerItem[] = response.data.response.map((item: any) => ({
          player: {
            id: item.player.id,
            name: item.player.name,
            photo: item.player.photo
          },
          statistics: {
            games: {
              appearences: item.statistics[0].games.appearences
            },
            goals: {
              total: item.statistics[0].goals.total,
              assists: item.statistics[0].goals.assists
            }
          }
        }))
        return playerItems
      })
  }

  getTopAssists(seasonId: number, leagueId: number) {
    return httpClient.get<playerItem>(`players/topassists?season=${seasonId}&league=${leagueId}`)
  }

  getSeasons() {
    return httpClient.get(`leagues/seasons`).then((response) => {
      return response.data.response
    })
  }
}

export const getDataService = new GetDataService()
