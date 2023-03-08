import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {LoginDataType, ResultCodesEnum, ResultCodesWithCaptcha} from "../types/types";

const SET_AUTHORIZED_USER_DATA = 'auth/SET_AUTHORIZED_USER_DATA'
const RESET_AUTHORIZED_USER_DATA = 'auth/RESET_AUTHORIZED_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }

}
type ActionsTypes = InferActionsTypes<typeof actions>
type SetAuthorizedUserDataActionPayloadType = {
    id: number
    email: string
    login: string
}
export const actions = {
    setAuthorizedUserData: (payload: SetAuthorizedUserDataActionPayloadType) => ({
        type: SET_AUTHORIZED_USER_DATA,
        payload
    } as const),
    resetAuthorizedUserData: () => ({
        type: RESET_AUTHORIZED_USER_DATA
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    } as const)
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const authMe = (): ThunkType => async (dispatch) => {
    const payload = await authAPI.authMe()
    if (payload.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthorizedUserData(payload.data))
    }
}

export const login = (loginData: LoginDataType): ThunkType => async (dispatch) => {
    const payload = await authAPI.login(loginData)
    if (payload.resultCode === ResultCodesEnum.Success) {
        dispatch(authMe())
    } else {
        if (payload.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const errorMessage = payload.messages.length > 0 ? payload.messages : 'Error'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const payload = await authAPI.logout()
    if (payload.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.resetAuthorizedUserData())
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const payload = await securityAPI.getCaptchaUrl()
    const captchaUrl = payload.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
