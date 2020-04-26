import { setUserData, clearUserInfo, updateCountry, updateCountryCode, updateGeoCoords } from './mutations'
import { setCountry, setCountryCode } from './actions'
import { getUserPhotoURL, getUserName, getUserPhoneNumber, getUserAddress, getUserRequest, getCountryCode, getCountry, getCoordinates } from './getters'

export default {
    namespaced: true,
    state: {
        uid: '',
        timestamp: '',
        name: '',
        photoURL: '',
        address: '',
        country: '',
        countryCode: '',
        casePriority: '',
        phoneNumber: '',
        request: '',
        coordinates: {
            lat: 0,
            lng: 0
        },
        email: ''
    },
    mutations: {
        setUserData,
        clearUserInfo,
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
        getUserName,
        getUserPhoneNumber,
        getUserAddress,
        getUserRequest,
        getCountryCode,
        getCountry,
        getCoordinates
    }
}