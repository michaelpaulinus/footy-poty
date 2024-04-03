<script setup lang="ts">
import Home from "@/components/Home.vue";
import createDb from "./services/createDb";

// createDb().then(() => {
//   console.log("Database initialization complete!");
// });
</script>

<template>
  <v-app class="app">
    <Home></Home>
  </v-app>
</template>
