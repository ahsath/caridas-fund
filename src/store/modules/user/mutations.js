export const onSuccessfulLogin = (state, { name, email, photoURL }) => {
    state.user.name = name
    state.user.email = email
    state.user.photoURL = photoURL
    state.user.isLoggedIn = true
}
export const onSignOut = state => {
    state.user.name = null
    state.user.email = null
    state.user.photoURL = null
    state.user.isLoggedIn = false
}
