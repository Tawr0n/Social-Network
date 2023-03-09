import {authMe} from "./authReducer";
import {InferActionsTypes, ThunkType} from "./reduxStore";

const initialState: InitialStateType = {
    isInitialized: false,
    globalErrors: []
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'social-network/app/INITIALIZED_SUCCESSFULLY':
            return {
                ...state,
                isInitialized: true
            }
        case 'social-network/app/ADD_GLOBAL_ERROR':
            return {
                ...state,
                globalErrors: [...state.globalErrors, action.errorMessage]
            }
        case 'social-network/app/REMOVE_GLOBAL_ERROR':
            state.globalErrors.shift()
            return {
                ...state,
                globalErrors: [...state.globalErrors]
            }
        default:
            return state
    }

}

export const actions = {
    initializedSuccessfully: () => ({
        type: 'social-network/app/INITIALIZED_SUCCESSFULLY'
    } as const),
    addGlobalError: (errorMessage: string) => ({
        type: 'social-network/app/ADD_GLOBAL_ERROR',
        errorMessage
    } as const),
    removeGlobalError: () => ({
        type: 'social-network/app/REMOVE_GLOBAL_ERROR'
    } as const)
}

export const initializeApp = (): ThunkType<ActionsTypes, void> => (dispatch) => {
    const authMePromise = dispatch(authMe())
    Promise.all([authMePromise])
        .then(() => {
            dispatch(actions.initializedSuccessfully())
        })
}

export default appReducer

type InitialStateType = {
    isInitialized: boolean
    globalErrors: Array<string>
}
type ActionsTypes = InferActionsTypes<typeof actions>
