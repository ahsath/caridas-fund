import { setUserData, updateCountry, updateCountryCode, updateGeoCoords } from './mutations'
import { setCountry, setCountryCode } from './actions'
import { getUserPhotoURL, getUserName, getCountryCode, getCountry, getCoordinates, getUserUID } from './getters'

export default {
    namespaced: true,
    state: {
        uid: '',
        name: '',
        photoURL: '',
        country: '',
        countryCode: '',
        coordinates: {
            lat: 0,
            lng: 0
        },
        email: ''
    },
    mutations: {
        setUserData,
        updateCountry,
        updateCountryCode,
        updateGeoCoords
    },
    actions: {
        setCountry,
        setCountryCode
    },
    getters: {
        getUserPhotoURL,
        getCountryCode,
        getCountry,
        getCoordinates,
        getUserUID,
        getUserName
    }
}