import {authMe} from "./authReducer";

const INITIALIZED_SUCCESSFULLY = 'INITIALIZED_SUCCESSFULLY'

const initialState = {
    isInitialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESSFULLY:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state
    }

}
const initializedSuccessfully = () => ({
    type: INITIALIZED_SUCCESSFULLY
})

export const initializeApp = () => (dispatch) => {
    const authMePromise = dispatch(authMe())
    Promise.all([authMePromise])
        .then(() => {
            dispatch(initializedSuccessfully())
        })
}


export default appReducer
