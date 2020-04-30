export const setUserData = (state, { uid, name, photoURL, email }) => {
    state.uid = uid
    state.name = name
    state.photoURL = photoURL
    state.email = email
}
export const updateGeoCoords = (state, coords) => {
    state.coordinates.lat = coords.latitude
    state.coordinates.lng = coords.longitude
}
export const updateCountry = (state, country) => state.country = country
export const updateCountryCode = (state, countryCode) => state.countryCode = countryCode
export const updateCallingCode = (state, callingCode) => state.callingCode = callingCode 