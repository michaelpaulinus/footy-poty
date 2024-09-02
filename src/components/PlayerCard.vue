<script lang="ts">
	import { defineComponent } from "vue";
	import type Player from "@/models/Player";

	export default defineComponent({
		props: {
			player: {
				type: Object as () => Player,
				required: true,
			},

			isLoading: {
				type: Boolean,
			},
		},
	});
</script>

<template>
	<v-card
		width="12.5rem"
		rounded
		elevation="12"
		:loading="isLoading"
	>
		<v-img :src="player.player.photo" />
		<v-card-title style="display: flex; justify-content: center">
			<p>{{ player.player.name }}</p>
			<v-img
				:src="player.statistics[0].team.logo"
				max-width="1.5rem"
				max-height="1.5rem"
				width="1.5rem"
				height="1.5rem"
			/>
		</v-card-title>
		<v-card-text>
			<v-row
				align-content="space-evenly"
				style="display: flex; justify-content: space-evenly"
			>
				<p>
					<v-icon icon="mdi-soccer-field"></v-icon>—{{
						player.statistics[0].games.appearences
					}}
				</p>
				<p>
					<v-icon icon="mdi-soccer"></v-icon>—{{
						player.statistics[0].goals.total
					}}
				</p>
				<p>
					<v-icon icon="mdi-handshake"></v-icon>—{{
						player.statistics[0].goals.assists
					}}
				</p>
			</v-row>
		</v-card-text>
	</v-card>
</template>
