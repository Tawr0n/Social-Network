import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTHORIZED_USER_DATA = 'auth/SET_AUTHORIZED_USER_DATA'
const RESET_AUTHORIZED_USER_DATA = 'auth/RESET_AUTHORIZED_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORIZED_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case RESET_AUTHORIZED_USER_DATA:
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }

}
const setAuthorizedUserData = (payload) => ({
    type: SET_AUTHORIZED_USER_DATA,
    payload
})
const resetAuthorizedUserData = () => ({
    type: RESET_AUTHORIZED_USER_DATA
})

export const authMe = () => async (dispatch) => {
    const payload = await authAPI.authMe()
    if (payload.resultCode === 0) {
        dispatch(setAuthorizedUserData(payload.data))
    }
}

export const login = (loginData) => async (dispatch) => {
    const payload = await authAPI.login(loginData)
    if (payload.resultCode === 0) {
        dispatch(authMe())
    } else {
        const errorMessage = payload.messages.length > 0 ? payload.messages : 'Error'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}

export const logout = () => async (dispatch) => {
    const payload = await authAPI.logout()
    if (payload.resultCode === 0) {
        dispatch(resetAuthorizedUserData())
    }
}

export default authReducer
