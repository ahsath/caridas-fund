import { setUserLoggedInStatus } from './mutations'
import { signInWithPopup, logout } from './actions'
import { isUserLoggedIn } from './getters'

export default {
    state: {
        isUserLoggedIn: false
    },
    mutations: {
        setUserLoggedInStatus
    },
    actions: {
        signInWithPopup,
        logout
    },
    getters: {
        isUserLoggedIn
    }
}