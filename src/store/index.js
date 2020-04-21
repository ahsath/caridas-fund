import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import { fetchCurrentUser } from '../plugins/vuex/fetchCurrentUser'
import detectGeoPermission from '../plugins/vuex/detectGeoPermission'
import getGeoCoords from '../helpers/getGeoCoords'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [fetchCurrentUser({ namespace: 'user/' }), detectGeoPermission],
  modules: {
    user
  },
  state: {
    location: {
      coords: {
        lat: null,
        long: null
      },
      city: null,
      country: null
    },
    geoEnabled: false,
    geoPermission: null,
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
  mutations: {
    updateLocation: (state, { lat, long, city, country }) => {
      state.location.coords.lat = lat
      state.location.coords.long = long
      state.location.city = city
      state.location.country = country
    },
    updateGeoPermission: (state, permission) => state.geoPermission = permission
  },
  actions: {
    enableGeolocation: ({ commit }) => {
      if ('geolocation' in navigator) getGeoCoords(geoPosSuccess, geoPosError)
      function geoPosSuccess(geoPos) {
        commit('updateLocation', { lat: geoPos.coords.latitude, long: geoPos.coords.longitude })
        commit('updateGeoPermission', 'granted')
      }
      function geoPosError(geoPosErr) {
        switch (geoPosErr.code) {
          case 1:
            commit('updateGeoPermission', 'denied')
            break;
          case 2:
            commit('updateGeoPermission', 'POSITION_UNAVAILABLE')
            break;
        }
      }
    }
  },
  getters: {
    getCityAndCountry: ({ location: { city, country } }) => city && country ? `${city}, ${country}` : null,
    getGeoPermission: ({ geoPermission }) => geoPermission,
    isGeoEnabled: ({ geoPermission }) => {
      switch (geoPermission) {
        case 'granted':
          return true
        case 'prompt' || 'denied':
          return false
      }
    }
  },
})
