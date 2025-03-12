import type Player from '@/models/player';
import type PlayerTableRow from '@/models/player-table-row';

function mapPlayersToTableItems(players: Player[]) {
	return players.map((player) => {
		return {
			name: player.player.name,
			photo: player.player.photo,
			team: player.statistics[0].team.logo,
			position: player.statistics[0].games.position,
			appearences: player.statistics[0].games.appearences,
			goals: player.statistics[0].goals.total,
			assists: player.statistics[0].goals.assists,
			rating: parseFloat(player.statistics[0].games.rating).toFixed(2),
		} as PlayerTableRow;
	});
}

export default mapPlayersToTableItems;
