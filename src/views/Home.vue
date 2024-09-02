<script lang="ts">
	import DataService from "@/services/DataService";
	import leagues from "@/data/leagues";
	import type Player from "@/models/Player";
	import PlayerCard from "@/components/PlayerCard.vue";

	export default {
		components: {
			PlayerCard,
		},

		data() {
			return {
				defaultLeague: 39,
				defaultSeason: new Date().getFullYear(),
				topScorers: [] as Player[],
				seasons: [] as number[],
				isLoading: true,
				leagues,
			};
		},

		methods: {
			async getSeasons() {
				try {
					this.seasons = await DataService.getSeasonsDb(this.defaultLeague);

					this.seasons = this.seasons.filter((val) => {
						return val <= this.defaultSeason;
					});

					this.seasons.reverse();

					this.defaultSeason = this.seasons[0];
				} catch (error) {
					console.error(error);
				}
			},

			async getTopScorers() {
				try {
					this.isLoading = true;
					this.topScorers = await DataService.getTopScorersDb(
						this.defaultSeason,
						this.defaultLeague
					);
				} catch (error) {
					console.error(error);
				} finally {
					this.isLoading = false;
				}
			},
		},

		async mounted() {
			await this.getSeasons();
			await this.getTopScorers();
		},
	};
</script>

<template>
	<v-container
		class="hero"
		fluid
	>
		<div class="header">
			<h1 style="display: flex; justify-content: center">
				FOOTY
				<v-img
					src="/images/football-award.png"
					width="3rem"
				/>
				POTY
			</h1>
		</div>

		<br />

		<div class="description">
			Your all in one website to keep up with the latest player data from
			Europe's Top 5 leagues.
		</div>

		<br />

		<div class="selectors">
			<v-select
				v-model="defaultLeague"
				label="League"
				rounded
				:items="leagues"
				item-title="name"
				item-value="value"
				@update:model-value="getTopScorers()"
			/>
			<v-select
				v-model="defaultSeason"
				label="Season"
				rounded
				:items="seasons"
				:item-title="(v: number) => v + '/' + (v + 1 - 2000)"
				:item-value="(v: number) => v"
				@update:model-value="getTopScorers()"
			/>
		</div>

		<br />

		<div>
			<h2 class="header">TOP SCORERS</h2>

			<br />

			<div class="player-container">
				<player-card
					v-for="item in topScorers"
					:player="item"
					:is-loading="isLoading"
				/>
			</div>
		</div>
	</v-container>
</template>

<style scoped>
	h1 {
		font-weight: bolder;
		font-size: 3rem;
		font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
			"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
	}

	.header {
		display: flex;
		justify-content: center;
	}

	.description {
		display: flex;
		justify-content: center;
	}

	.selectors {
		display: flex;
		justify-content: space-evenly;
	}

	.player-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.hero {
		min-height: 100%;
		background: url("/images/pexels-juan-salamanca-61143.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
</style>
