import {followAPI, usersAPI} from "../api/api";
import {UserType} from "../types/types";

const FOLLOW_TOGGLE = 'users/FOLLOW_TOGGLE'
const SET_USERS = 'users/SET_STATE'
const SET_ACTIVE_PAGE = 'users/SET_ACTIVE_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const LOADING_TOGGLE = 'users/LOADING_TOGGLE'
const FOLLOWING_IN_PROGRESS_TOGGLE = 'users/FOLLOWING_IN_PROGRESS_TOGGLE'


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    activePage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>, //array of users id
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW_TOGGLE:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: !u.followed
                        }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.activePage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case LOADING_TOGGLE:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case FOLLOWING_IN_PROGRESS_TOGGLE:
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }


}
type FollowToggleActionType = {
    type: typeof FOLLOW_TOGGLE
    userId: number
}
export const followToggle = (userId: number): FollowToggleActionType => ({
    type: FOLLOW_TOGGLE,
    userId
})
type LoadingToggleActionType = {
    type: typeof LOADING_TOGGLE
    isLoading: boolean
}
export const loadingToggle = (isLoading: boolean): LoadingToggleActionType => ({
    type: LOADING_TOGGLE,
    isLoading
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
})
type SetActivePageActionType = {
    type: typeof SET_ACTIVE_PAGE
    activePage: number
}
export const setActivePage = (activePage: number): SetActivePageActionType => ({
    type: SET_ACTIVE_PAGE,
    activePage
})
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
type FollowingInProgressToggleActionType = {
    type: typeof FOLLOWING_IN_PROGRESS_TOGGLE
    isFollowingInProgress: boolean
    userId: number
}
export const followingInProgressToggle = (isFollowingInProgress: boolean, userId: number): FollowingInProgressToggleActionType => ({
    type: FOLLOWING_IN_PROGRESS_TOGGLE,
    isFollowingInProgress, userId
})
export const requestUsers = (pageNumber = 1, pageSize = 5) => async (dispatch: any, getState: any) => {
    dispatch(loadingToggle(true))
    dispatch(setActivePage(pageNumber))
    const payload = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(setUsers(payload.items))
    if (!getState().usersPage.totalUsersCount) {
        dispatch(setTotalUsersCount(payload.totalCount))
    }
    dispatch(loadingToggle(false))
}

const followUnfollowFunctionality = async (dispatch: any, userId: number, apiMethod: any) => {
    dispatch(followingInProgressToggle(true, userId))
    const payload = await apiMethod(userId)
    if (payload.resultCode === 0) {
        dispatch(followToggle(userId))
    }
    dispatch(followingInProgressToggle(false, userId))
}
export const follow = (userId: number) => (dispatch: any) => {
    const apiMethod = followAPI.follow
    followUnfollowFunctionality(dispatch, userId, apiMethod)

}

export const unfollow = (userId: number) => (dispatch: any) => {
    const apiMethod = followAPI.unfollow
    followUnfollowFunctionality(dispatch, userId, apiMethod)
}
export default usersReducer
