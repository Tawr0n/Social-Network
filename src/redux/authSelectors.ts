import {AppStateType} from "./reduxStore";

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.id
}

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.login
}
