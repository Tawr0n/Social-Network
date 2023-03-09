import {stopSubmit} from "redux-form";
import {InferActionsTypes, ThunkType} from "./reduxStore";
import {LoginDataType} from "../types/types";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodesEnum, ResultCodesWithCaptcha} from "../api/api";

const SET_AUTHORIZED_USER_DATA = 'social-network/auth/SET_AUTHORIZED_USER_DATA'
const RESET_AUTHORIZED_USER_DATA = 'social-network/auth/RESET_AUTHORIZED_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS'

const initialState: InitialAuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialAuthStateType => {
    switch (action.type) {
        case SET_AUTHORIZED_USER_DATA:
            return {
                ...state,
                ...action.data,
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

type SetAuthorizedUserDataActionPayloadType = {
    id: number
    email: string
    login: string
}
export const actions = {
    setAuthorizedUserData: (data: SetAuthorizedUserDataActionPayloadType) => ({
        type: SET_AUTHORIZED_USER_DATA,
        data
    } as const),
    resetAuthorizedUserData: () => ({
        type: RESET_AUTHORIZED_USER_DATA
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    } as const)
}


export const authMe = (): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthorizedUserData(data.data))
    }
}

export const login = (loginData: LoginDataType): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await authAPI.login(loginData)
    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(authMe())
    } else {
        if (data.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        const errorMessage = data.messages.length > 0 ? data.messages : 'Error'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}

export const logout = (): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.resetAuthorizedUserData())
    }
}

export const getCaptchaUrl = (): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

export type InitialAuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type ActionsTypes = InferActionsTypes<typeof actions>
