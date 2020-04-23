import firebase from '../../firebase'

export default (opts = {}) => {
    const namespace = opts.namespace || ''
    return store => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                store.commit({
                    type: `${namespace}onSuccessfulLogin`,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                })
                unsubscribe()
            }
        })
    }
}