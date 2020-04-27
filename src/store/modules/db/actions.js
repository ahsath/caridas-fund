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
        commit('setUserDocId', querySnapshot.docs[0].id)
        const { name, timestamp, address, country, countryCode, casePriority, phoneNumber, request, coordinates } = querySnapshot.docs[0].data()
        return Promise.resolve({ name, timestamp, address, country, countryCode, casePriority, phoneNumber, request, coordinates })
    }
}

export const saveUserRequest = ({ commit }, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = await requestsRef.add(data)
            commit('setUserDocId', docRef.id)
            resolve('Tu solicitud se ha guardado y será visible en breve')
        } catch (e) {
            console.log(e);
            reject('Hubo un problema al guardar tu solicitud')
        }
    })
}

export const updateUserRequest = ({ commit, getters }, data) => {
    return new Promise(async (resolve, reject) => {
        const docRef = requestsRef.doc(getters.getUserDocId)
        try {
            await docRef.update(data)
            commit('user/setUserData', data)
            resolve('Tu solicitud se ha actualizado exitosamente')
        } catch (e) {
            console.log(e);
            reject('Hubo un problema al actualizar tu solicitud')
        }
    })
}