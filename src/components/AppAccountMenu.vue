<template>
  <v-menu offset-y>
    <template #activator="{ on }">
      <v-btn v-on="on" icon>
        <v-avatar size="40">
          <img :src="getUserPhotoURL" :alt="getUserName" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          Cuenta
          <v-chip label small>Pronto</v-chip>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>Salir</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters("user", ["getUserPhotoURL", "getUserName"])
  }
};
</script>