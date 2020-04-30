import { setUserData, updateCountry, updateCountryCode, updateGeoCoords, updateCallingCode } from './mutations'
import { setCountry, setCountryCode } from './actions'
import { getUserPhotoURL, getUserName, getCountryCode, getCountry, getCoordinates, getUserUID, getCallingCode } from './getters'

export default {
    namespaced: true,
    state: {
        uid: '',
        name: '',
        photoURL: '',
        country: '',
        countryCode: '',
        callingCode: '',
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
        updateGeoCoords,
        updateCallingCode
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
        getUserName,
        getCallingCode
    }
}