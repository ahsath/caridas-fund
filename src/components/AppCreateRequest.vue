<template>
  <v-dialog v-model="open" fullscreen>
    <v-app-bar fixed>
      <v-app-bar-nav-icon @click="open = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Pedir ayuda</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="normal-case" @click="$refs.geolocationDialog.open = true" text>Publicar</v-btn>
    </v-app-bar>

    <v-card tile>
      <v-banner class="mx-auto relative" v-model="banner" sticky app>
        <v-avatar slot="icon" color="primary" size="40">
          <v-icon class="grey--text text--darken-4" size="24">{{ mdiSatelliteVariant }}</v-icon>
        </v-avatar>Habilita la geolocalización del dispositivo para publicar tu solicitud en el mapa
        <template
          #actions
        >
          <v-btn class="normal-case" @click.stop="banner = !banner" color="primary" text>Despúes</v-btn>
          <v-btn class="normal-case" @click.stop color="primary" text>Habilitar</v-btn>
        </template>
      </v-banner>

      <v-content>
        <v-container class="pa-4">
          <v-row justify="center" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <v-text-field
                v-model="person.name"
                label="Nombre*"
                hint="* Requerido"
                outlined
                clearable
                required
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <v-text-field
                v-model="person.phone"
                label="Teléfono*"
                hint="* Requerido"
                prefix="+57"
                placeholder="Teléfono de contacto"
                :prepend-inner-icon="mdiCellphoneAndroid"
                outlined
                clearable
                required
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <v-text-field
                v-model="person.address"
                label="Dirección*"
                hint="* Requerido"
                placeholder="Dirección corta"
                :prepend-inner-icon="mdiMapMarker"
                outlined
                clearable
                required
                persistent-hint
              ></v-text-field>
              <v-icon class="text--disabled">{{ mdiCircleMedium }}</v-icon>
              <span class="caption text--disabled">Ubicación desconocida</span>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-2" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <v-textarea
                v-model="person.request"
                label="Tu caso*"
                hint="* Requerido. Dile a las personas cómo pueden ayudarte proporcionando información de contacto, cuentas bancarias y/o direcciones"
                placeholder="Explica tu caso"
                counter="480"
                outlined
                clearable
                required
                persistent-hint
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-2" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <span class="font-weight-medium mr-2">Selecciona la prioridad de tu caso</span>
              <v-icon>{{ mdiHelpCircle }}</v-icon>
              <v-radio-group v-model="casePriorityCode">
                <v-radio
                  v-for="({ text, color, code }, i) in casePriorities"
                  :key="i"
                  :label="text"
                  :value="code"
                  :color="color"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-card>
    <app-enable-geolocation ref="enableGeolocation"></app-enable-geolocation>
  </v-dialog>
</template>

<script>
import {
  mdiClose,
  mdiSatelliteVariant,
  mdiCellphoneAndroid,
  mdiMapMarker,
  mdiCircleMedium,
  mdiHelpCircle
} from "@mdi/js";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("user");

export default {
  data: () => ({
    person: {
      name: null,
      phone: null,
      address: null,
      request: null,
      casePriority: {
        code: null,
        text: null
      }
    },
    casePriorityCode: 2,
    casePriorities: [
      { text: "Emergencia", color: "red lighten-1", code: 1, emoji: "🚨" },
      { text: "Crítico", color: "orange lighten-1", code: 2, emoji: "🔥" },
      {
        text: "Puedo esperar",
        color: "yellow  lighten-1",
        code: 3,
        emoji: "🥺"
      },
      { text: "Los que puedan", color: "blue lighten-1", code: 4, emoji: "🙏🏼" }
    ],
    open: true,
    banner: true,
    mdiClose,
    mdiSatelliteVariant,
    mdiCellphoneAndroid,
    mdiMapMarker,
    mdiCircleMedium,
    mdiHelpCircle
  }),
  components: {
    AppEnableGeolocation: () =>
      import(
        /* webpackChunkName: "AppEnableGeolocation" */ "./AppEnableGeolocation"
      )
  },
  computed: {
    ...mapGetters(["getName"])
  },
  mounted() {
    this.person.name = this.getName;
  }
};
</script>