import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import db from './modules/db'
import auth from './modules/auth'
import initStore from '../plugins/vuex/initStore'
import getGeoCoords from '../helpers/getGeoCoords'
import firebase from '../firebase/'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [initStore],
  state: {
    geoEnabled: false,
    geoPermission: null,
    networkConnection: 'online',
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
  modules: {
    auth,
    db,
    user
  },
  mutations: {
    updateGeoPermission: (state, permission) => state.geoPermission = permission,
    updateNetworkConnection: (state, networkStatus) => state.networkConnection = networkStatus
  },
  actions: {
    enableGeolocation: ({ commit }) => {
      if ('geolocation' in navigator) getGeoCoords(geoPosSuccess, geoPosError)
      function geoPosSuccess(geoPos) {
        commit('user/updateGeoCoords', { latitude: geoPos.coords.latitude, longitude: geoPos.coords.longitude })
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
    getGeoPermission: ({ geoPermission }) => geoPermission,
    isGeoEnabled: ({ geoPermission }) => {
      switch (geoPermission) {
        case 'granted':
          return true
        case 'prompt' || 'denied':
          return false
      }
    },
    getNetworkConnection: ({ networkConnection }) => networkConnection,
    getPriorityCases: ({ casePriorities }) => casePriorityCode => casePriorityCode ? casePriorities.find(({ code }) => code === casePriorityCode) : casePriorities,
    getFirebaseGeoPoint: (_, getters) => new firebase.firestore.GeoPoint(getters['user/getCoordinates'].lat, getters['user/getCoordinates'].lng)
  },
})
