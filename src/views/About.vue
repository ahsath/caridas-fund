<template>
  <section>
    <app-header></app-header>
    <v-content>
      <v-container>
        <v-card max-width="724" class="mx-auto">
          <v-card-title>
            <v-icon color="primary" class="mr-2" size="24">{{ mdiInformation }}</v-icon>Acerca de Caridas
          </v-card-title>
          <v-card-text>
            Debido a la pandemia del
            <kbd>COVID-19</kbd>, muchos países del mundo han decretado la cuarentena obligatoria, prohibiendo temporalmente la reunión social y el cierre de negocios no esenciales en casi todo el mundo. Este bloqueo ha impactado las vidas de millones de personas en todo el mundo y muchos han perdido su trabajo, que en algunos casos es la principal fuente de ingresos para muchas familias.
          </v-card-text>
          <v-card-text
            class="pt-0"
          >El objetivo de este proyecto es proporcionar una plataforma en línea de solicitud de ayuda siempre gratuita donde los más vulnerables y las personas necesitadas pueden publicar sus casos y luego ser visibles en un mapa para que otros con un corazón amable puedan ayudar comunicándose con la persona necesitada.</v-card-text>
          <v-card-text
            class="pt-0"
          >Aunque no cobramos por el uso de la plataforma, si requiere tiempo y recursos para mantenerla, si consideras que este proyecto es útil, puedes considerar donarnos para que podamos seguir mejorando y dar voz a las personas que más necesitan.</v-card-text>
          <v-card-text>
            <kbd>PayPal:</kbd>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              class="mt-4"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="FD4EDG8XLZPQ6" />
              <input
                type="image"
                src="https://www.paypalobjects.com/es_ES/i/btn/btn_donateCC_LG.gif"
                border="0"
                name="submit"
                title="PayPal: ¡la forma más segura y fácil de pagar en línea!"
                alt="Donar con el boton de PayPal"
              />
            </form>
          </v-card-text>
          <v-card-text>
            <kbd>bitcoin: 1AzypPi2v61sF1EU2BJdGzyBnxyTMKxazM</kbd>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </section>
</template>

<script>
import AppHeader from "../components/AppHeader";
import { mdiInformation } from "@mdi/js";
export default {
  data: () => ({
    mdiInformation
  }),
  components: {
    AppHeader
  }
};
</script>