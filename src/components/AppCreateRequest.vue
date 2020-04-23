<template>
  <v-dialog v-model="open" fullscreen>
    <v-app-bar fixed>
      <v-app-bar-nav-icon @click="open = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Pedir ayuda</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="grey--text text--darken-4 normal-case"
        :ripple="{ 'class': 'white--text' }"
        :disabled="!isGeoSupported || isGeoPermissionDenied || isPositionUnavailable || !isFormValid || !isGeoEnabled"
        @click="publish"
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
              <v-form v-model="isFormValid" ref="form">
                <v-text-field
                  v-model="person.name"
                  label="Nombre*"
                  hint="* Requerido"
                  outlined
                  clearable
                  required
                  persistent-hint
                  :rules="[
                    name => !!name || 'Tu nombre es requerido',
                    name => !!name && name.length <= 25 || 'El nombre debe tener 25 caracteres o menos'
                  ]"
                ></v-text-field>
                <v-text-field
                  class="mt-4"
                  v-model="formatedPhoneNumber"
                  label="Teléfono*"
                  hint="* Requerido"
                  :prefix="phonePrefix"
                  placeholder="Teléfono de contacto"
                  :prepend-inner-icon="mdiCellphoneAndroid"
                  outlined
                  clearable
                  required
                  persistent-hint
                  :rules="[
                    phone => !!phone || 'Tu teléfono es requerido',
                    phone => !!phone && phone.length <= 16 || 'Número telefónico debe tener 16 caracteres o menos'
                  ]"
                ></v-text-field>
                <v-text-field
                  class="mt-4"
                  v-model="person.address"
                  label="Dirección*"
                  hint="* Requerido"
                  placeholder="Dirección corta"
                  :prepend-inner-icon="mdiMapMarker"
                  outlined
                  clearable
                  required
                  persistent-hint
                  :rules="[
                  address => !!address || 'Tu dirección es requerida', 
                  address => !!address && address.length <= 60 || 'La dirección debe tener 60 caracteres o menos'
                ]"
                ></v-text-field>
                <!-- <v-icon v-if="getCityAndCountry" color="primary" x-small>{{ mdiMapMarker }}</v-icon>
                <v-icon v-else class="text--disabled" x-small>{{ mdiCrosshairsOff }}</v-icon>
                <span
                  class="caption text--disabled ml-2"
                >{{ getCityAndCountry || 'Ubicación desconocida' }}</span>-->
                <v-textarea
                  class="mt-4"
                  v-model="person.request"
                  label="Tu caso*"
                  hint="* Requerido. Dile a las personas cómo pueden ayudarte proporcionando información de contacto, cuentas bancarias y/o direcciones"
                  placeholder="Explica tu caso"
                  counter="480"
                  outlined
                  clearable
                  required
                  auto-grow
                  persistent-hint
                  :rules="[
                  request => !!request || 'Tu caso es requerido',
                  request => !!request && request.length <= 480 || 'Tu caso debe tener 480 caracteres o menos'
                ]"
                ></v-textarea>
              </v-form>
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
import { mapGetters, mapActions } from "vuex";
import { AsYouType, getCountryCallingCode } from "libphonenumber-js/max";
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

export default {
  data: () => ({
    isFormValid: false,
    person: {
      name: "",
      address: "",
      casePriority: {
        code: 2,
        text: "",
        emoji: ""
      },
      phone: {
        number: ""
      },
      request: ""
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
    formatedPhoneNumber: null,
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
    ...mapGetters({
      getName: "user/getName",
      getPhotoURL: "user/getPhotoURL",
      isGeoEnabled: "isGeoEnabled",
      getGeoPermission: "getGeoPermission",
      getCountryCode: "getCountryCode",
      getCountry: "getCountry",
      getCoords: "getCoords"
    }),
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
    },
    phonePrefix() {
      return this.getCountryCode
        ? `+${getCountryCallingCode(this.getCountryCode)}`
        : "";
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
    },
    formatedPhoneNumber(rawNumber) {
      if (this.getCountryCode) {
        this.formatedPhoneNumber = new AsYouType(this.getCountryCode).input(
          rawNumber
        );
        this.person.phone.number = this.formatedPhoneNumber;
      } else {
        this.person.phone.number = rawNumber;
      }
    }
  },
  methods: {
    ...mapActions(["enableGeolocation"]),
    publish() {
      if (this.$refs.form.validate()) {
        if (this.isGeoEnabled) {
          const person = {
            // publishDate,
            name: this.person.name,
            photoURL: this.getPhotoURL,
            address: this.person.address,
            country: this.getCountry || "",
            countryCode: this.countryCode || "",
            casePriority: this.person.casePriority,
            phone: this.person.phone.number,
            request: this.person.request,
            location: {
              lat: this.getCoords.lat,
              long: this.getCoords.long
            }
          };
          return;
        }
        this.snackMessage = "Habilita la geolocalización para publicar";
        this.showSnack = true;
      }
    }
  },
  mounted() {
    this.person.name = this.getName;
  }
};
</script>