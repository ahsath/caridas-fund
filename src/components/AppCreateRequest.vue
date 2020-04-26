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
        :disabled="!isGeoSupported || isGeoPermissionDenied || isPositionUnavailable || !isFormValid || !isGeoEnabled || getNetworkConnection === 'offline'"
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
                  v-model="person.phoneNumber"
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
                  v-for="({ text, color, code }, i) in getPriorityCases"
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
  mdiCrosshairsQuestion,
  mdiCloudAlert
} from "@mdi/js";
import { getTime, formatDistanceStrict } from "date-fns";
import { es } from "date-fns/locale";
// const dateNow = getTime(new Date());

// const distanceInWords = formatDistanceStrict(1587775243117, new Date(), {
//   addSuffix: true,
//   locale: es
// });

export default {
  data: () => ({
    isFormValid: false,
    person: {
      name: "",
      address: "",
      phoneNumber: "",
      request: "",
      phoneNumber: ""
    },
    casePriorityCode: 2,
    open: true,
    alert: {
      type: null,
      msg: null,
      color: null,
      icon: null
    },
    formatedPhoneNumber: "",
    showSnack: false,
    snackMessage: null,
    mdiClose,
    mdiSatelliteVariant,
    mdiCellphoneAndroid,
    mdiMapMarker,
    mdiHelpCircle,
    mdiMapMarkerOff,
    mdiCrosshairsOff,
    mdiCrosshairsQuestion,
    mdiCloudAlert
  }),
  computed: {
    ...mapGetters({
      getUserName: "user/getUserName",
      getUserPhotoURL: "user/getUserPhotoURL",
      getUserPhoneNumber: "user/getUserPhoneNumber",
      getUserRequest: "user/getUserRequest",
      getUserAddress: "user/getUserAddress",
      getCountryCode: "user/getCountryCode",
      getCountry: "user/getCountry",
      getCoords: "user/getCoordinates",
      isGeoEnabled: "isGeoEnabled",
      getGeoPermission: "getGeoPermission",
      getNetworkConnection: "getNetworkConnection",
      getPriorityCases: "getPriorityCases"
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
          "Has bloqueado el acceso a tu ubicación. Para habilitarlo nuevamente, toca el candado en tu navegador 🔒";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiCrosshairsOff;
        return true;
      }
      if (this.isPositionUnavailable) {
        this.alert.msg =
          "La geolocalización esta habilitada pero no pudimos obtener tu ubicación. Asegurate de estar conectado a internet, intenta nuevamente actualizando tu navegador o habilita la ubicación en tu dispositivo";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiCrosshairsQuestion;
        return true;
      }
      if (this.getNetworkConnection === "offline") {
        this.alert.msg = "Sin conexión a internet";
        this.alert.type = "error";
        this.alert.color = "red lighten-3";
        this.alert.icon = this.mdiCloudAlert;
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
    "person.phoneNumber"(rawNumber) {
      // to do: maybe check if number is valid?
      if (this.getCountryCode) {
        if (rawNumber) {
          this.person.phoneNumber = new AsYouType(this.getCountryCode).input(
            rawNumber
          );
        } else {
          this.person.phoneNumber = rawNumber;
        }
      } else {
        this.person.phoneNumber = rawNumber;
      }
    },
    getNetworkConnection(status) {
      switch (status) {
        case "online":
          this.snackMessage = "De nuevo en línea";
          this.showSnack = true;
          break;
        case "offline":
          this.snackMessage = "Sin conexion a internet";
          this.showSnack = true;
          break;
      }
    }
  },
  methods: {
    ...mapActions(["enableGeolocation"]),
    publish() {
      if (this.$refs.form.validate()) {
        if (this.isGeoEnabled) {
          // person help request object
          const person = {
            // uid<user's unique id>
            // timestamp<date in milliseconds>
            name: this.person.name,
            photoURL: this.getUserPhotoURL,
            address: this.person.address,
            country: this.getCountry,
            countryCode: this.getCountryCode,
            casePriority: this.casePriorityCode,
            phoneNumber: this.person.phoneNumber,
            request: this.person.request
            // The coordinates field must be a GeoPoint!
            // coordinates: new firebase.firestore.GeoPoint( this.getCoords.lat, this.getCoords.long)
          };
        }
        this.snackMessage = "Habilita la geolocalización para publicar";
        this.showSnack = true;
      }
    }
  },
  mounted() {
    this.person.name = this.getUserName;
    this.person.phoneNumber = this.getUserPhoneNumber;
    this.person.address = this.getUserAddress;
    this.person.request = this.getUserRequest;
  }
};
</script>