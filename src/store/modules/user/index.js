import { onSuccessfulLogin, onSignOut } from './mutations'
import { signInWithPopup, logout } from './actions'
import { isLoggedIn, getPhotoURL, getName } from './getters'

export default {
    namespaced: true,
    state: {
        user: {
            name: "",
            email: "",
            photoURL: "",
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
    },
    getters: {
        isLoggedIn,
        getPhotoURL,
        getName
    }
}