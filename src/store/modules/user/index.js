import { onSuccessfulLogin, onSignOut } from './mutations'
import { signInWithPopup, logout } from './actions'

export default {
    namespaced: true,
    state: {
        user: {
            name: null,
            email: null,
            photoURL: null,
            isLoggedIn: false,
        }
    },
    mutations: {
        onSuccessfulLogin,
        onSignOut
    },
    actions: {
        signInWithPopup,
        logout
    }
}