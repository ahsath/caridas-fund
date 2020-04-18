<template>
  <v-dialog v-model="open" max-width="320">
    <v-card elevation="24">
      <v-card-title class="headline">Debes autenticarte para comenzar</v-card-title>
      <v-card-text>
        <v-btn class="normal-case" @click="signInWithPopup" light large block>
          <v-icon left>$vuetify.icons.values.google</v-icon>
          <div class="leading-none">Inicia sesión con Google</div>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-checkbox v-model="termsAndConditionsAccepted" hide-details="auto">
          <template #label>
            <div class="body-2">
              He leído y acepto los
              <router-link to="/terminos-y-condiciones">terminos y condiciones</router-link>
            </div>
          </template>
        </v-checkbox>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");

export default {
  data: () => ({
    open: true,
    termsAndConditionsAccepted: false
  }),
  methods: {
    ...mapActions(["signInWithPopup"])
  }
};
</script>