<script lang="ts">
import leagues from '@/data/leagues';
import type Player from '@/models/player';
import playerCard from '@/components/player-card.vue';
import statsService from '@/services/stats-service';
import playerTable from '@/components/player-table.vue';

export default {
	components: {
		playerCard,
		playerTable,
	},

	data() {
		return {
			defaultLeague: 39,
			defaultSeason: new Date().getFullYear(),
			topScorers: [] as Player[],
			seasons: [] as number[],
			isTable: false,
			isLoading: true,
			leagues,
		};
	},

	methods: {
		async getSeasons() {
			try {
				this.isLoading = true;

				this.seasons = (await statsService.getSeasons(this.defaultLeague)).data;

				this.seasons = this.seasons.filter((val) => {
					return val <= this.defaultSeason;
				});

				this.seasons.reverse();

				this.defaultSeason = this.seasons[0];
			} catch (error) {
				console.error(error);
			} finally {
				this.isLoading = false;
			}
		},

		async getTopScorers() {
			try {
				this.isLoading = true;

				this.topScorers = (
					await statsService.getTopScorers(
						this.defaultSeason,
						this.defaultLeague
					)
				).data;
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

		<div class="selectors-and-table-toggle">
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
			<div class="table-toggle">
				<v-btn-toggle
					v-model="isTable"
					rounded
					mandatory
				>
					<v-btn
						icon="mdi-grid-large"
						:value="false"
					/>
					<v-btn
						icon="mdi-list-box-outline"
						:value="true"
					/>
				</v-btn-toggle>
			</div>
		</div>

		<br />

		<div>
			<h2 class="header">TOP SCORERS</h2>

			<br />

			<div
				v-if="isTable"
				class="player-table-container"
			>
				<player-table
					:players="topScorers"
					:is-loading="isLoading"
				/>
			</div>
			<div
				v-else
				class="player-container"
			>
				<player-card
					v-for="item in topScorers.slice(0, 5)"
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
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
		'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.header {
	display: flex;
	justify-content: center;
}

.description {
	display: flex;
	justify-content: center;
}

.selectors-and-table-toggle {
	display: flex;
	justify-content: center;
	/* align-items: center; */
	justify-content: space-between;
	width: 100%;
	gap: 1rem;
}

.selectors {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
}

.player-container {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
}

@media (max-width: 900px) {
	.player-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}
}

.hero {
	min-height: 100%;
	background: url('/images/pexels-juan-salamanca-61143.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
}
</style>
