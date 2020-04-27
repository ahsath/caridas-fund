import { setUserDocId } from './mutations'
import { getUserData, saveUserRequest, updateUserRequest } from './actions'
import { getUserDocId } from './getters'

export default {
    state: {
        userDocId: ''
    },
    mutations: {
        setUserDocId
    },
    actions: {
        getUserData,
        saveUserRequest,
        updateUserRequest
    },
    getters: {
        getUserDocId
    }
}