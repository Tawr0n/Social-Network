import {AppStateType} from "./reduxStore";

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.id
}
