import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import IconGoogleG from '../components/IconGoogleG.vue'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#90CAF9'
      }
    },
    dark: true
  },
  lang: {
    locales: { es },
    current: 'es',
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      google: {
        component: IconGoogleG
      }
    }
  },
});
