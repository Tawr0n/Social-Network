import {authAPI} from "../api/api";

const SET_AUTHORIZED_USER_DATA = 'SET_AUTHORIZED_USER_DATA'
const RESET_AUTHORIZED_USER_DATA = 'RESET_AUTHORIZED_USER_DATA'

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

export const authMe = () => {
    return dispatch => {
        authAPI.authMe().then(payload => {
            if (payload.resultCode === 0) {
                dispatch(setAuthorizedUserData(payload.data))
            }
        })
    }
}

export const login = (loginData) => (dispatch) => {
    authAPI.login(loginData).then(payload => {
        if (payload.resultCode === 0) {
            dispatch(authMe())
        }
    })
}
export const logout = () => (dispatch) => {
    authAPI.logout().then(payload => {
        if (payload.resultCode === 0) {
            dispatch(resetAuthorizedUserData())
        }
    })
}

export default authReducer
