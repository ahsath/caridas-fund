import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import { fetchCurrentUser } from '../plugins/fetchCurrentUser'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [fetchCurrentUser({ namespace: 'user/' })],
  modules: {
    user
  },
  state: {
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
  },
})
