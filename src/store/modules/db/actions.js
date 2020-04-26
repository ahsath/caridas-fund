import firebase from '../../../firebase'
import { GeoFirestore } from 'geofirestore'

// Create a Firestore reference
const firestore = firebase.firestore()

// Create a GeoFirestore reference
const geofirestore = new GeoFirestore(firestore)

// Create a requests GeoCollectionReference reference
const requestsRef = geofirestore.collection('requests')

export const getUserData = async ({ commit }, uid) => {
    const query = requestsRef.where('uid', "==", uid)
    const querySnapshot = await query.get()

    if (!querySnapshot.empty) {
        const { uid, timestamp, name, photoURL, address, country, countryCode, casePriority, phoneNumber, request, coordinates } = querySnapshot.docs[0].data
        commit('user/setUserData', { uid, timestamp, name, photoURL, address, country, countryCode, casePriority, phoneNumber, request, coordinates })
        return
    }
}