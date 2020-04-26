<template>
  <v-dialog v-model="open" max-width="320">
    <v-card elevation="24">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <v-btn class="normal-case" @click.stop="signin" light large block>
          <v-icon left>$vuetify.icons.values.google</v-icon>
          <div class="leading-none">Inicia sesión con Google</div>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-checkbox
          ref="checkbox"
          v-model="accept"
          hide-details="auto"
          :error-messages="errorMessage"
          :rules="[validateTermsAndConditionsRule]"
        >
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
import { mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Inicia sesión"
    },
    createRequestAfterLogin: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    open: true,
    accept: false,
    errorMessage: "",
    errorMessageTemplate: "Debes aceptar los terminos y condiciones"
  }),
  watch: {
    accept(val) {
      if (val) this.errorMessage = "";
    }
  },
  methods: {
    ...mapActions(["signInWithPopup"]),
    async signin() {
      if (this.validateCheckbox()) {
        try {
          this.$emit("login:success", {
            message: await this.signInWithPopup(),
            createRequestAfterLogin: this.createRequestAfterLogin
          });
          this.open = false;
        } catch (error) {
          this.$emit("login:fail", error);
          this.open = false;
        }
      }
    },
    validateCheckbox() {
      if (!this.$refs.checkbox.validate()) {
        this.errorMessage = this.errorMessageTemplate;
        return;
      }
      return true;
    },
    validateTermsAndConditionsRule(val) {
      return !!val || this.errorMessageTemplate;
    }
  }
};
</script>