<template>
  <v-container class="hero" fluid>
    <div class="header" style="display: flex; justify-content: center">
      <h1 style="font-weight: 700; font-size: 3em">
        FOOTY POTY! <v-icon icon="mdi-medal"></v-icon>
      </h1>
    </div>

    <br />

    <div class="description" style="display: flex; justify-content: center">
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
        :model-value="defaultLeague"
        :items="leagues"
        :item-title="(lv) => lv.name"
        :item-value="(lv) => lv.value"
        @update:model-value="
          (lv) => {
            defaultLeague = lv;
            getTopScorers();
          }
        "
      >
      </v-select>

      <v-select
        label="Season"
        rounded
        :model-value="defaultSeason"
        :items="seasons"
        :item-title="(v) => v + '/' + (v + 1 - 2000)"
        :item-value="(v) => v"
        @update:model-value="
          (v) => {
            defaultSeason = v;
            getTopScorers();
          }
        "
      >
      </v-select>
    </div>

    <br />

    <div>
      <h2 style="display: flex; justify-content: center">TOP SCORERS</h2>

      <br />

      <div>
        <v-row style="display: flex; justify-content: space-evenly">
          <v-col
            cols="2"
            v-for="(item, index) in topScorers"
            style="display: flex; justify-content: center"
          >
            <v-card width="200" rounded elevation="12" :loading="isLoading">
              <v-img :src="item.player.photo"></v-img>
              <v-card-title style="display: flex; justify-content: center">
                ({{ index + 1 }}) {{ item.player.name }}</v-card-title
              >
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

<script lang="ts">
import { getDataService } from "@/services/GetDataService";
import leagues from "@/data/leagues";

export default {
  mounted() {
    this.getSeasons();
    this.getTopScorers();
  },

  data() {
    return {
      defaultLeague: 39,
      defaultSeason: new Date().getFullYear() - 1,
      topScorers: [] as any[],
      seasons: [] as any[],
      isLoading: true,
      leagues: leagues,
    };
  },

  methods: {
    async getTopScorers() {
      this.isLoading = true;

      this.topScorers = await getDataService.getTopScorersDb(
        this.defaultSeason,
        this.defaultLeague
      );

      this.isLoading = false;
    },

    async getSeasons() {
      this.seasons = await getDataService.getSeasonsDb(this.defaultLeague);

      this.seasons = this.seasons.filter((val: number) => {
        return val <= this.defaultSeason;
      });
      this.seasons.reverse();
      this.defaultSeason = this.seasons[0];
    },
  },
};
</script>

<style scoped>
h1 {
  margin: auto;
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
