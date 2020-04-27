import { setUserData, updateCountry, updateCountryCode, updateGeoCoords, updateTimestamp } from './mutations'
import { setCountry, setCountryCode } from './actions'
import { getUserPhotoURL, getUserName, getUserPhoneNumber, getUserAddress, getUserRequest, getCountryCode, getCountry, getCoordinates, getUserCasePriorityCode, getUserUID, getTimestamp } from './getters'

export default {
    namespaced: true,
    state: {
        uid: '',
        timestamp: 0,
        name: '',
        photoURL: '',
        address: '',
        country: '',
        countryCode: '',
        casePriority: 2,
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
        updateCountry,
        updateCountryCode,
        updateGeoCoords,
        updateTimestamp
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
        getCoordinates,
        getUserCasePriorityCode,
        getUserUID,
        getTimestamp
    }
}