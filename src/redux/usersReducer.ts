import {followAPI, usersAPI} from "../api/api";
import {ResultCodesEnum, UserType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW_TOGGLE = 'social-network/users/FOLLOW_TOGGLE'
const SET_USERS = 'social-network/users/SET_STATE'
const SET_ACTIVE_PAGE = 'social-network/users/SET_ACTIVE_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT'
const LOADING_TOGGLE = 'social-network/users/LOADING_TOGGLE'
const FOLLOWING_IN_PROGRESS_TOGGLE = 'social-network/users/FOLLOWING_IN_PROGRESS_TOGGLE'


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    activePage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>, //array of users id
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    followToggle: (userId: number) => ({
        type: FOLLOW_TOGGLE,
        userId
    } as const),
    loadingToggle: (isLoading: boolean) => ({
        type: LOADING_TOGGLE,
        isLoading
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
    setActivePage: (activePage: number) => ({
        type: SET_ACTIVE_PAGE,
        activePage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const),
    followingInProgressToggle: (isFollowingInProgress: boolean, userId: number) => ({
        type: FOLLOWING_IN_PROGRESS_TOGGLE,
        isFollowingInProgress, userId
    } as const)
}


type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const requestUsers = (pageNumber = 1, pageSize = 5) => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.loadingToggle(true))
        dispatch(actions.setActivePage(pageNumber))
        const payload = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.setUsers(payload.items))
        if (!getState().usersPage.totalUsersCount) {
            dispatch(actions.setTotalUsersCount(payload.totalCount))
        }
        dispatch(actions.loadingToggle(false))
    }
}

const _followUnfollowFunctionality = async (dispatch: DispatchType, userId: number, apiMethod: any): Promise<void> => {
    dispatch(actions.followingInProgressToggle(true, userId))
    const payload = await apiMethod(userId)
    if (payload.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.followToggle(userId))
    }
    dispatch(actions.followingInProgressToggle(false, userId))
}

export const follow = (userId: number): ThunkType => (dispatch) => {
    const apiMethod = followAPI.follow
    _followUnfollowFunctionality(dispatch, userId, apiMethod)

}

export const unfollow = (userId: number): ThunkType => (dispatch) => {
    const apiMethod = followAPI.unfollow
    _followUnfollowFunctionality(dispatch, userId, apiMethod)
}
export default usersReducer
