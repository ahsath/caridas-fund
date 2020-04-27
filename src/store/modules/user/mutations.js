export const setUserData = (state, { uid, timestamp, name, photoURL, address, country, countryCode, casePriority, phoneNumber, request, email, coordinates = { latitude: '', longitude: '' } }) => {
    state.uid = uid || state.uid
    state.timestamp = timestamp || state.timestamp
    state.name = name || state.name
    state.photoURL = photoURL || state.photoURL
    state.address = address || state.address
    state.country = country || state.country
    state.countryCode = countryCode || state.countryCode
    state.casePriority = casePriority || 2
    state.phoneNumber = phoneNumber || state.phoneNumber
    state.request = request || state.request
    state.email = email || state.email
    state.coordinates.lat = coordinates.latitude || state.coordinates.lat
    state.coordinates.lng = coordinates.longitude || state.coordinates.lng
}

export const updateGeoCoords = (state, { lat, lng }) => {
    state.coordinates.lat = lat
    state.coordinates.lng = lng
}

export const updateCountry = (state, country) => state.country = country

export const updateCountryCode = (state, countryCode) => state.countryCode = countryCode

export const updateTimestamp = (state, timestamp) => state.timestamp = timestamp 