import firebase from '../../../firebase'

export const signInWithPopup = ({ commit }) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return new Promise(async (resolve, reject) => {
        try {
            const { user: { displayName, email, photoURL, uid } } = await firebase.auth().signInWithPopup(provider)
            commit('user/setUserData', {
                uid,
                name: displayName,
                email: email,
                photoURL
            })
            commit('setUserLoggedInStatus', true)
            resolve('Autenticación exitosa')
        } catch (error) {
            switch (error.code) {
                case 'auth/cancelled-popup-request':
                    reject('Demasiadas solicitudes de inicio de sesión')
                    break;
                case 'auth/popup-closed-by-user':
                    reject('Inicio de sesión cancelado')
                    break;
                case 'auth/popup-blocked':
                    reject('Operación bloqueada por el buscador')
                    break;
                default:
                    reject('Hubo un problema al iniciar sesión. Intenta nuevamente')
            }
        }
    })
}

export const logout = async ({ commit }) => {
    await firebase.auth().signOut()
    commit('setUserLoggedInStatus', false)
}