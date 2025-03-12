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
	<v-data-table
		:items="mappedPlayers"
		:loading="isLoading"
	>
		<template v-slot:item.photo="{ value }">
			<v-img
				:src="value"
				width="2rem"
				height="2rem"
			/>
		</template>

		<template v-slot:item.team="{ value }">
			<v-img
				:src="value"
				width="2rem"
				height="2rem"
			/>
		</template>

		<template #bottom> </template>
	</v-data-table>
</template>
