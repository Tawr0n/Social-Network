import {authMe} from "./authReducer";

const INITIALIZED_SUCCESSFULLY = 'app/INITIALIZED_SUCCESSFULLY'
const ADD_GLOBAL_ERROR = 'app/ADD_GLOBAL_ERROR'
const REMOVE_GLOBAL_ERROR = 'app/REMOVE_GLOBAL_ERROR'

const initialState = {
    isInitialized: false,
    globalErrors: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESSFULLY:
            return {
                ...state,
                isInitialized: true
            }
        case ADD_GLOBAL_ERROR:
            return {
                ...state,
                globalErrors: [...state.globalErrors, action.errorMessage]
            }
        case REMOVE_GLOBAL_ERROR:
            state.globalErrors.shift()
            return {
                ...state,
                globalErrors: [...state.globalErrors]
            }
        default:
            return state
    }

}
const initializedSuccessfully = () => ({
    type: INITIALIZED_SUCCESSFULLY
})
export const addGlobalError = (errorMessage) => ({
    type: ADD_GLOBAL_ERROR,
    errorMessage
})
export const removeGlobalError = () => ({
    type: REMOVE_GLOBAL_ERROR
})

export const initializeApp = () => (dispatch) => {
    const authMePromise = dispatch(authMe())
    Promise.all([authMePromise])
        .then(() => {
            dispatch(initializedSuccessfully())
        })
}


export default appReducer
