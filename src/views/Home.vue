<script lang="ts">
	import { getDataService } from "@/services/GetDataService";
	import leagues from "@/data/leagues";
	import type PlayerItem from "@/models/PlayerItem";

	export default {
		data() {
			return {
				defaultLeague: 39,
				defaultSeason: new Date().getFullYear(),
				topScorers: [] as PlayerItem[],
				seasons: [] as number[],
				isLoading: true,
				leagues,
			};
		},

		methods: {
			async getSeasons() {
				this.seasons = await getDataService.getSeasonsDb(this.defaultLeague);

				this.seasons = this.seasons.filter((val) => {
					return val <= this.defaultSeason;
				});

				this.seasons.reverse();

				this.defaultSeason = this.seasons[0];
			},

			async getTopScorers() {
				this.isLoading = true;

				this.topScorers = await getDataService.getTopScorersDb(
					this.defaultSeason,
					this.defaultLeague
				);

				this.isLoading = false;
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
		<div
			class="header"
			style="display: flex; justify-content: center"
		>
			<h1
				style="
					font-weight: 700;
					font-size: 3em;
					display: flex;
					justify-content: center;
				"
			>
				FOOTY
				<v-img
					src="/images/football-award.png"
					width="50"
				></v-img>
				POTY
			</h1>
		</div>

		<br />

		<div
			class="description"
			style="display: flex; justify-content: center"
		>
			<p>
				Your all in one website to keep up with the latest player data from
				Europe's Top 5 leagues.
			</p>
		</div>

		<br />

		<div class="selectors">
			<v-select
				label="League"
				rounded
				v-model="defaultLeague"
				:items="leagues"
				:item-title="(lv: any) => lv.name"
				:item-value="(lv: any) => lv.value"
				@update:model-value="
					(lv: any) => {
						defaultLeague = lv;
						getTopScorers();
					}
				"
			/>

			<v-select
				label="Season"
				rounded
				v-model="defaultSeason"
				:items="seasons"
				:item-title="(v: any) => v + '/' + (v + 1 - 2000)"
				:item-value="(v: any) => v"
				@update:model-value="
					(v:any) => {
						defaultSeason = v;
						getTopScorers();
					}
				"
			/>
		</div>

		<br />

		<div>
			<h2 style="display: flex; justify-content: center">TOP SCORERS</h2>

			<br />

			<div>
				<v-row style="display: flex; justify-content: space-evenly">
					<v-col
						cols="12"
						xs="6"
						sm="6"
						md="4"
						lg="2"
						xl="2"
						v-for="(item, index) in topScorers"
						style="display: flex; justify-content: center"
					>
						<v-card
							width="200"
							rounded
							elevation="12"
							:loading="isLoading"
						>
							<v-img :src="item.player.photo"></v-img>
							<v-card-title style="display: flex; justify-content: center">
								<p>{{ item.player.name }}</p>
								<v-img
									:src="item.statistics[0].team.logo"
									max-width="24px"
									max-height="24px"
									width="24px"
									height="24px"
								></v-img>
							</v-card-title>
							<v-card-text>
								<v-row
									align-content="space-evenly"
									style="display: flex; justify-content: space-evenly"
								>
									<p>
										<v-icon icon="mdi-soccer-field"></v-icon>—{{
											item.statistics[0].games.appearences
										}}
									</p>
									<p>
										<v-icon icon="mdi-soccer"></v-icon>—{{
											item.statistics[0].goals.total
										}}
									</p>
									<p>
										<v-icon icon="mdi-handshake"></v-icon>—{{
											item.statistics[0].goals.assists
										}}
									</p>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</div>
		</div>
	</v-container>
</template>

<style scoped>
	h1 {
		font-size: xx-large;
	}

	.selectors {
		display: flex;
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
