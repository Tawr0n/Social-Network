import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => u)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getActivePage = (state: AppStateType) => {
    return state.usersPage.activePage
}

export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
