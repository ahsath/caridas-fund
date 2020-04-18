import firebase from '../../../firebase'

export const signInWithPopup = async context => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
        const { user: { displayName, email, photoURL } } = await firebase.auth().signInWithPopup(provider)
        context.commit({
            type: 'onSuccessfulLogin',
            name: displayName,
            email,
            photoURL
        })
    } catch (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    }
}

export const logout = async context => {
    try {
        await firebase.auth().signOut()
        context.commit('onSignOut')
    } catch (error) {
        console.log(error);
    }
}