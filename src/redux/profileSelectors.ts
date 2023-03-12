import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getProfileSelector = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getProfile = createSelector(getProfileSelector, (profile) => profile)

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}
