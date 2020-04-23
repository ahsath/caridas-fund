import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import fetchCurrentUser from '../plugins/vuex/fetchCurrentUser'
import detectGeoPermission from '../plugins/vuex/detectGeoPermission'
import dispatchActions from '../plugins/vuex/dispatchActions'
import getGeoCoords from '../helpers/getGeoCoords'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [fetchCurrentUser({ namespace: 'user/' }), detectGeoPermission, dispatchActions],
  modules: {
    user
  },
  state: {
    location: {
      coords: {
        lat: 0,
        long: 0
      },
      country: "",
      countryCode: ""
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
    updateGeoCoords: (state, { lat, long }) => {
      state.location.coords.lat = lat
      state.location.coords.long = long
    },
    updateCountry: (state, country) => state.location.country = country,
    updateCountryCode: (state, countryCode) => state.location.countryCode = countryCode,
    updateGeoPermission: (state, permission) => state.geoPermission = permission
  },
  actions: {
    enableGeolocation: ({ commit }) => {
      if ('geolocation' in navigator) getGeoCoords(geoPosSuccess, geoPosError)
      function geoPosSuccess(geoPos) {
        commit('updateGeoCoords', { lat: geoPos.coords.latitude, long: geoPos.coords.longitude })
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
    },
    detectUserLocationInfo: async ({ commit, getters, rootGetters }) => {
      if (!rootGetters["user/isLoggedIn"]) {
        const res = await fetch("https://freegeoip.app/json/");
        const data = await res.json()
        const { country_name, country_code, latitude, longitude } = data
        commit('updateCountry', country_name)
        commit('updateCountryCode', country_code)
        if (getters.getGeoPermission === "prompt" || getters.getGeoPermission === "denied") {
          commit('updateGeoCoords', { lat: latitude, long: longitude })
        }
      }
    }
  },
  getters: {
    getGeoPermission: ({ geoPermission }) => geoPermission,
    isGeoEnabled: ({ geoPermission }) => {
      switch (geoPermission) {
        case 'granted':
          return true
        case 'prompt' || 'denied':
          return false
      }
    },
    getCountryCode: ({ location: { countryCode } }) => countryCode,
    getCountry: ({ location: { country } }) => country,
    getCoords: ({ location }) => location.coords,
  },
})
