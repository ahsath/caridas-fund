import firebase from '../../../firebase'

const db = firebase.firestore()
const requestsRef = db.collection('requests')

export const getUserData = async (_, uid) => {
    // Add better error handling
    return Promise.resolve(await requestsRef.doc(uid).get())
}
export const saveUserRequest = (_, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await requestsRef.doc(data.uid).set(data)
            resolve({ timestamp: data.timestamp, msg: 'Tu solicitud se ha guardado y será visible en breve' })
        } catch {
            reject('Hubo un problema al guardar tu solicitud')
        }
    })
}
export const updateUserRequest = (_, data) => {
    return new Promise(async (resolve, reject) => {
        const docRef = requestsRef.doc(data.uid)
        try {
            await docRef.update(data)
            resolve({ timestamp: data.timestamp, msg: 'Tu solicitud se ha actualizado exitosamente' })
        } catch {
            reject('Hubo un problema al actualizar tu solicitud')
        }
    })
}
export const getRequests = async () => {
    try {
        return Promise.resolve(await requestsRef.get())
    } catch (e) {
        console.log(e)
    }
}