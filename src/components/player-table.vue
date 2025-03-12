<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type Player from '@/models/player';
import type PlayerTableRow from '@/models/player-table-row';
import mapPlayersToTableItems from '@/utils/mapPlayersToTableItems';
import { pl } from 'vuetify/locale';

export default defineComponent({
	props: {
		players: {
			type: Array as PropType<Player[]>,
			required: true,
		},

		isLoading: {
			type: Boolean,
		},
	},

	computed: {
		mappedPlayers() {
			return mapPlayersToTableItems(this.players);
		},
	},

	methods: {
		mapPlayersToTableItems,
	},
});
</script>

<template>
	<v-data-table :items="mappedPlayers"></v-data-table>
</template>
