export const setUserData = (state, { uid, timestamp, name, photoURL, address, country, countryCode, casePriority, phoneNumber, request, email, coordinates = [] }) => {
    state.uid = uid || ''
    state.timestamp = timestamp || ''
    state.name = name || ''
    state.photoURL = photoURL || ''
    state.address = address || ''
    state.country = country || state.country
    state.countryCode = countryCode || state.countryCode
    state.casePriority = casePriority || ''
    state.phoneNumber = phoneNumber || ''
    state.request = request || ''
    state.email = email || ''
    state.coordinates.lat = coordinates[0] || state.coordinates.lat
    state.coordinates.lng = coordinates[1] || state.coordinates.lng
}
export const clearUserInfo = state => {
    state.uid = ''
    state.timestamp = ''
    state.name = ''
    state.photoURL = ''
    state.address = ''
    state.casePriority = ''
    state.phoneNumber = ''
    state.request = ''
    state.email = ''
}
export const updateGeoCoords = (state, { lat, lng }) => {
    state.coordinates.lat = lat
    state.coordinates.lng = lng
}
export const updateCountry = (state, country) => state.country = country
export const updateCountryCode = (state, countryCode) => state.countryCode = countryCode