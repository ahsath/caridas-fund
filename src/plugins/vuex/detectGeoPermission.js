import getGeoCoords from '../../helpers/getGeoCoords'
// import storageAvailable from '../../helpers/storageAvailable'
import queryGeoPermissions from '../../helpers/queryGeoPermissions'

export default store => {
    init({
        onStateChange: result => {
            store.commit('updateGeoPermission', result.state)
            result.addEventListener('change', () => store.commit('updateGeoPermission', result.state))
        },
        geoCoords: geoPos => store.commit('updateLocation', {
            lat: geoPos.coords.latitude,
            long: geoPos.coords.longitude,
            city: null,
            country: null
        })
    })
}

const init = ({ onStateChange, geoCoords, onError }) => {
    if ('geolocation' in navigator) {
        if ('permissions' in navigator) {
            queryGeoPermissions().then(result => {
                if (result.state === 'granted') getGeoCoords(geoCoords)
                onStateChange(result)
            })
        }
    }
}