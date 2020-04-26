import firebase from '../../firebase'
import getGeoCoords from '../../helpers/getGeoCoords'
import queryGeoPermissions from '../../helpers/queryGeoPermissions'

export default ({ commit, dispatch }) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const { uid, displayName, email, photoURL } = user
            commit('setUserLoggedInStatus', true)
            commit('user/setUserData', {
                uid,
                name: displayName,
                email,
                photoURL
            })
            dispatch('db/getUserData', user.uid)
        }
        unsubscribe()
    })

    init({
        onStateChange: result => {
            commit('updateGeoPermission', result.state)
            result.addEventListener('change', () => commit('updateGeoPermission', result.state))
        },
        geoCoords: geoPos => commit('user/updateGeoCoords', {
            lat: geoPos.coords.latitude,
            lng: geoPos.coords.longitude
        })
    })

    commit('updateNetworkConnection', navigator.onLine ? 'online' : 'offline')

    window.addEventListener('online', () => {
        commit('updateNetworkConnection', 'online')
    })
    window.addEventListener('offline', () => commit('updateNetworkConnection', 'offline'))
}

// To do: Move this to an action or create a nice class
const init = ({ onStateChange, geoCoords }) => {
    if ('geolocation' in navigator && 'permissions' in navigator) {
        queryGeoPermissions().then(result => {
            if (result.state === 'granted') getGeoCoords(geoCoords)
            onStateChange(result)
        })
    }
}