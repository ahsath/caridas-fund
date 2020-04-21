import firebase from '../../../firebase'

export const signInWithPopup = context => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return new Promise(async (resolve, reject) => {
        try {
            const { user: { displayName, email, photoURL } } = await firebase.auth().signInWithPopup(provider)
            context.commit({
                type: 'onSuccessfulLogin',
                name: displayName,
                email,
                photoURL
            })
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

export const logout = async context => {
    await firebase.auth().signOut()
    context.commit('onSignOut')
}