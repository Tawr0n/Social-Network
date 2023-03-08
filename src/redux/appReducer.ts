import {authMe} from "./authReducer";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";

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

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccessfully: () => ({
        type: INITIALIZED_SUCCESSFULLY
    } as const),
    addGlobalError: (errorMessage: string) => ({
        type: ADD_GLOBAL_ERROR,
        errorMessage
    } as const),
    removeGlobalError: () => ({
        type: REMOVE_GLOBAL_ERROR
    } as const)
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
    const authMePromise = dispatch(authMe())
    Promise.all([authMePromise])
        .then(() => {
            dispatch(actions.initializedSuccessfully())
        })
}


export default appReducer
