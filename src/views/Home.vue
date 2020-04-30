<template>
  <div class="h-min-height">
    <app-header>
      <template #section:right>
        <app-account-menu v-if="isLoggedIn"></app-account-menu>
        <v-btn
          v-else
          color="primary"
          class="grey--text text--darken-4 normal-case"
          :ripple="{ 'class': 'white--text' }"
          @click="showAppLogin({ title: 'Inicia sesión' })"
        >Entrar</v-btn>
      </template>
    </app-header>

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
    <app-create-request v-if="isAppCreateRequestShown" @open:create-request="createRequest"></app-create-request>
    <app-person-case ref="personCase" v-if="isPersonCaseShown" :person="person"></app-person-case>
    <v-snackbar v-model="showSnack" left>{{ snackMessage }}</v-snackbar>
    <l-map @click:marker="showAppPersonCase"></l-map>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mdiHumanGreeting } from "@mdi/js";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";
import AppHeader from "../components/AppHeader";

export default {
  data: () => ({
    isAppLoginShown: false,
    isAppCreateRequestShown: false,
    isPersonCaseShown: false,
    showSnack: false,
    snackMessage: "",
    appLoginTitle: "",
    createRequestAfterLogin: false,
    person: {},
    mdiHumanGreeting
  }),
  methods: {
    showAppLogin({ title = "Inicia sesión", createRequestAfterLogin = false }) {
      this.appLoginTitle = title;
      this.createRequestAfterLogin = createRequestAfterLogin;
      this.isAppLoginShown = true;
      if ("login" in this.$refs) this.$refs.login.open = true;
    },
    createRequest(val) {
      setTimeout(() => {
        this.isAppCreateRequestShown = val;
      }, 200);
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
    },
    showAppPersonCase(person) {
      this.person = person;
      // this.showAppPersonCase();
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
    },
    marker(person) {}
  },
  components: {
    AppHeader,
    LMap: () => ({
      component: import(
        /* webpackChunkName: "LMap.vue" */ "../components/LMap"
      ),
      loading: IsLoading,
      error: IsError,
      timeout: 6000
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
    ...mapGetters({
      isLoggedIn: "isUserLoggedIn",
      getGeoPermission: "getGeoPermission"
    })
  }
};
</script>

