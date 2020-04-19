<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Caridas</v-toolbar-title>
      <v-btn to="/acerca" tag="a" class="text--secondary normal-case ml-4" text>
        <v-icon left>{{ mdiInformation }}</v-icon>Acerca
      </v-btn>
      <v-spacer></v-spacer>

      <app-account-menu v-if="isLoggedIn"></app-account-menu>
      <v-btn
        v-else
        color="primary"
        class="grey--text text--darken-4 normal-case"
        :ripple="{ 'class': 'white--text' }"
        @click="showAppLogin({ title: 'Inicia sesión' })"
      >Entrar</v-btn>
    </v-app-bar>

    <v-btn
      color="primary"
      class="grey--text text--darken-4 normal-case left-1/2 -translate-x-1/2 z-5"
      :ripple="{ 'class': 'white--text' }"
      @click="showAppCreateRequest"
      elevation="24"
      fixed
      bottom
      x-large
      rounded
    >
      <v-icon left>{{ mdiHumanGreeting }}</v-icon>Pedir ayuda
    </v-btn>

    <app-login
      ref="login"
      v-if="isAppLoginShown"
      @login:success="onSuccessfulLogin"
      @login:fail="onFailLogin"
      :title="appLoginTitle"
      :createRequestAfterLogin="createRequestAfterLogin"
    ></app-login>
    <app-create-request ref="createRequest" v-if="isAppCreateRequestShown"></app-create-request>
    <app-person-case ref="personCase" v-if="isPersonCaseShown" :person="person"></app-person-case>
    <v-snackbar v-model="showSnack" left>{{ snackMessage }}</v-snackbar>
    <!-- <mapbox-gl></mapbox-gl> -->
  </v-app>
</template>

<script>
import { mdiInformation, mdiHumanGreeting } from "@mdi/js";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("user");

export default {
  data: () => ({
    isAppLoginShown: false,
    isAppCreateRequestShown: true,
    isPersonCaseShown: false,
    showSnack: false,
    snackMessage: "",
    appLoginTitle: "",
    createRequestAfterLogin: false,
    mdiInformation,
    mdiHumanGreeting
  }),
  methods: {
    showAppLogin({ title = "Inicia sesión", createRequestAfterLogin = false }) {
      this.appLoginTitle = title;
      this.createRequestAfterLogin = createRequestAfterLogin;
      this.isAppLoginShown = true;
      if ("login" in this.$refs) this.$refs.login.open = true;
    },
    showAppCreateRequest() {
      if (!this.isLoggedIn) {
        this.showAppLogin({
          title: "Debes autenticarte para pedir ayuda",
          createRequestAfterLogin: true
        });
        return;
      }
      this.isAppCreateRequestShown = true;
      if ("createRequest" in this.$refs) this.$refs.createRequest.open = true;
    },
    showAppPersonCase() {
      this.isPersonCaseShown = true;
      if ("personCase" in this.$refs) this.$refs.personCase.open = true;
    },
    onSuccessfulLogin({ message, createRequestAfterLogin }) {
      if (createRequestAfterLogin) this.showAppCreateRequest();
      this.snackMessage = message;
      this.showSnack = true;
    },
    onFailLogin(msg) {
      this.snackMessage = msg;
      this.showSnack = true;
    }
  },
  components: {
    MapboxGl: () => ({
      component: import(
        /* webpackChunkName: "MapboxGL.vue" */ "../components/MapboxGL"
      ),
      loading: IsLoading,
      error: IsError,
      timeout: 3000
    }),
    AppLogin: () =>
      import(/* webpackChunkName: "AppLogin.vue" */ "../components/AppLogin"),
    AppCreateRequest: () =>
      import(
        /* webpackChunkName: "AppCreateRequest.vue" */ "../components/AppCreateRequest"
      ),
    AppPersonCase: () =>
      import(
        /* webpackChunkName: "AppPersonCase.vue" */ "../components/AppPersonCase"
      ),
    AppAccountMenu: () =>
      import(
        /* webpackChunkName: "AppAccountMenu.vue" */ "../components/AppAccountMenu"
      )
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.snackMessage = "Saliste de la aplicación";
        this.showSnack = true;
      }
    }
  },
  computed: {
    person() {
      return {
        photoURL: "https://i.pravatar.cc/200",
        name: "Maria Girardot",
        publishDate: "hace 2 días",
        address: "Cra. 115B. CL. 64E",
        location: [90, -90],
        country: "Colombia",
        city: "Medellín",
        casePriority: {
          code: 1,
          text: "Emergencia",
          emoji: "🚨"
        },
        phone: {
          international: "+57 310 4892658",
          type: "MOBILE"
        },
        request:
          "Hola, soy una persona que desde el dia de febrero estoy sin trabajar la empresa donde trabajaba hasta el dia de hoy no me liquida y necesito para comer y pagar donde vivo soy una persona sola trabajaba para ayudarme con mis gastos y estoy sin trabajar no tengo ni plata para comer"
      };
    },
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

