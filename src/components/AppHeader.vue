<template>
  <v-app-bar app>
    <v-toolbar-title>
      <router-link to="/" class="d-flex align-center no-underline">
        <v-icon color="primary" x-large>$vuetify.icons.values.logo</v-icon>
        <span class="ml-2 font-weight-bold white--text">Caridas</span>
      </router-link>
    </v-toolbar-title>
    <v-btn to="/acerca" tag="a" class="text--secondary normal-case ml-4" text>
      <v-icon left>{{ mdiInformation }}</v-icon>Acerca
    </v-btn>
    <v-spacer></v-spacer>
    <slot name="section:right"></slot>
  </v-app-bar>
</template>

<script>
import { mdiInformation } from "@mdi/js";
export default {
  data: () => ({
    mdiInformation
  })
};
</script>