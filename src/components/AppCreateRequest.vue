<template>
  <v-dialog v-model="open" fullscreen>
    <v-app-bar fixed>
      <v-app-bar-nav-icon @click="open = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Pedir ayuda</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="normal-case"
        @click="publish"
        :disabled="!isGeoSupported || isGeoPermissionDenied || isPositionUnavailable"
        text
      >Publicar</v-btn>
    </v-app-bar>

    <v-card tile>
      <v-banner class="mx-auto relative" v-model="showBanner" sticky app>
        <v-avatar slot="icon" color="primary" size="40">
          <v-icon class="grey--text text--darken-4" size="24">{{ mdiSatelliteVariant }}</v-icon>
        </v-avatar>Habilita la geolocalización del dispositivo para publicar tu solicitud en el mapa
        <template
          #actions
        >
          <v-btn class="normal-case" @click.stop="enableGeolocation" color="primary" text>Habilitar</v-btn>
        </template>
      </v-banner>

      <v-content>
        <v-container class="pa-4">
          <v-row justify="center" dense>
            <v-col cols="12" sm="10" md="6" lg="5" xl="4">
              <v-alert
                v-model="showAlert"
                border="left"
                :type="alert.type"
                :color="alert.color"
                dense
                text
                :icon="alert.icon"
              >{{ alert.msg }}</v-alert>
            </v-col>
          </v-row>
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
              <v-icon v-if="getCityAndCountry" class="text--secondary" x-small>{{ mdiMapMarker }}</v-icon>
              <v-icon v-else class="text--disabled" x-small>{{ mdiCrosshairsOff }}</v-icon>
              <span
                class="caption text--disabled ml-2"
              >{{ getCityAndCountry || 'Ubicación desconocida' }}</span>
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
          <v-snackbar v-model="showSnack" left>{{ snackMessage }}</v-snackbar>
        </v-container>
      </v-content>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiClose,
  mdiSatelliteVariant,
  mdiCellphoneAndroid,
  mdiMapMarker,
  mdiHelpCircle,
  mdiMapMarkerOff,
  mdiCrosshairsOff,
  mdiCrosshairsQuestion
} from "@mdi/js";

import { mapGetters, mapActions } from "vuex";

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
    alert: {
      type: null,
      msg: null,
      color: null,
      icon: null
    },
    showSnack: false,
    snackMessage: null,
    mdiClose,
    mdiSatelliteVariant,
    mdiCellphoneAndroid,
    mdiMapMarker,
    mdiHelpCircle,
    mdiMapMarkerOff,
    mdiCrosshairsOff,
    mdiCrosshairsQuestion
  }),
  computed: {
    ...mapGetters([
      "user/getName",
      "getCityAndCountry",
      "isGeoEnabled",
      "getGeoPermission"
    ]),
    showAlert() {
      if (!this.isGeoSupported) {
        this.alert.msg =
          "La geolocalización no esta soportada en este buscador";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiMapMarkerOff;
        return true;
      }
      if (this.isGeoPermissionDenied) {
        this.alert.msg =
          "Has bloqueado el acceso a tu ubicación. Para habilitarlo nuevamente, ve a la configuración de tu navegador ⚙️";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiCrosshairsOff;
        return true;
      }
      if (this.isPositionUnavailable) {
        this.alert.msg =
          "No pudimos obtener tu ubicación. Intenta nuevamente actualizando tu navegador o habilitando la ubicación en tu dispositivo";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiCrosshairsQuestion;
        return true;
      }
      return false;
    },
    isGeoSupported() {
      return "geolocation" in navigator;
    },
    isGeoPermissionGranted() {
      return this.getGeoPermission === "granted";
    },
    isGeoPermissionDenied() {
      return this.getGeoPermission === "denied";
    },
    isPositionUnavailable() {
      return this.getGeoPermission === "POSITION_UNAVAILABLE";
    },
    showBanner() {
      return this.isGeoSupported === !this.isGeoEnabled;
    }
  },
  watch: {
    getGeoPermission: {
      immediate: true,
      handler: function(permission) {
        switch (this.getGeoPermission) {
          case "granted":
            this.snackMessage = "La geolocalización está habilitada";
            this.showSnack = true;
            break;
          case "denied":
            this.snackMessage = "La geolocalización ha sido deshabilitada";
            this.showSnack = true;
            break;
        }
      }
    }
  },
  methods: {
    ...mapActions(["enableGeolocation"]),
    publish() {
      if (this.isGeoEnabled) {
      }
      this.snackMessage = "Habilita la geolocalización para publicar";
      this.showSnack = true;
    }
  },
  mounted() {
    this.person.name = this.getName;
  }
};
</script>