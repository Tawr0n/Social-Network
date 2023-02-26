import {authMe} from "./authReducer";

const INITIALIZED_SUCCESSFULLY = 'app/INITIALIZED_SUCCESSFULLY'
const ADD_GLOBAL_ERROR = 'app/ADD_GLOBAL_ERROR'
const REMOVE_GLOBAL_ERROR = 'app/REMOVE_GLOBAL_ERROR'

type InitialStateType = {
    isInitialized: boolean
    globalErrors: Array<string>
}
const initialState: InitialStateType = {
    isInitialized: false,
    globalErrors: []
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializedSuccessfullyActionType = {
    type: typeof INITIALIZED_SUCCESSFULLY
}
const initializedSuccessfully = (): InitializedSuccessfullyActionType => ({
    type: INITIALIZED_SUCCESSFULLY
})
type AddGlobalErrorActionType = {
    type: typeof ADD_GLOBAL_ERROR
    errorMessage: string
}
export const addGlobalError = (errorMessage: string): AddGlobalErrorActionType => ({
    type: ADD_GLOBAL_ERROR,
    errorMessage
})
type RemoveGlobalErrorActionType = {
    type: typeof REMOVE_GLOBAL_ERROR
}
export const removeGlobalError = (): RemoveGlobalErrorActionType => ({
    type: REMOVE_GLOBAL_ERROR
})

export const initializeApp = () => (dispatch: any) => {
    const authMePromise = dispatch(authMe())
    Promise.all([authMePromise])
        .then(() => {
            dispatch(initializedSuccessfully())
        })
}


export default appReducer