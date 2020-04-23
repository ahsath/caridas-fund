<template>
  <v-app>
    <router-view v-if="isBrowserSupported" />
    <app-browser-notice v-else></app-browser-notice>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isBrowserSupported: false
  }),
  components: {
    AppBrowserNotice: () =>
      import(
        /* webpackChunkName: "AppBrowserNotice.vue" */ "./components/AppBrowserNotice"
      )
  },
  created() {
    if (typeof navigator.brave === "undefined") {
      this.isBrowserSupported = true;
    }
  }
};
</script>


