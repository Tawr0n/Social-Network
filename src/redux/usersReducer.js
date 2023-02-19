import {followAPI, usersAPI} from "../api/api";

const FOLLOW_TOGGLE = 'users/FOLLOW_TOGGLE'
const SET_USERS = 'users/SET_STATE'
const SET_ACTIVE_PAGE = 'users/SET_ACTIVE_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const LOADING_TOGGLE = 'users/LOADING_TOGGLE'
const FOLLOWING_IN_PROGRESS_TOGGLE = 'users/FOLLOWING_IN_PROGRESS_TOGGLE'

const initialState = {
    users: [/*{
        id: 1,
        fullName: 'Kit Yaroslav',
        image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
        isFollowed: true,
        status: 'I`m a ukrainian',
        location: {country: 'Ukraine', city: 'Lviv'}
    },
        {
            id: 2,
            fullName: 'Pennings Daniel',
            image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
            isFollowed: false,
            status: 'Летючий голандець',
            location: {country: 'Ukraine', city: 'Lviv'}
        },*/],
    totalUsersCount: 0,
    pageSize: 10,
    activePage: 1,
    isLoading: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
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
export const followToggle = (userId) => ({
    type: FOLLOW_TOGGLE,
    userId
})
export const loadingToggle = (isLoading) => ({
    type: LOADING_TOGGLE,
    isLoading
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users
})
export const setActivePage = (activePage) => ({
    type: SET_ACTIVE_PAGE,
    activePage
})
export const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const followingInProgressToggle = (isFollowingInProgress, userId) => ({
    type: FOLLOWING_IN_PROGRESS_TOGGLE,
    isFollowingInProgress, userId
})
export const requestUsers = (activePage = 1, pageSize = 5, users) => async (dispatch) => {
    if (users.length === 0) {
        dispatch(loadingToggle(true))

        const payload = await usersAPI.getUsers(activePage, pageSize)
        dispatch(setUsers(payload.items))
        dispatch(setTotalUsersCount(payload.totalCount))
        dispatch(loadingToggle(false))
    }
}
export const getUsersOnClick = (pageNumber = 1, pageSize = 5) => async (dispatch) => {
    dispatch(setActivePage(pageNumber))
    dispatch(loadingToggle(true))

    const payload = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(setUsers(payload.items))
    dispatch(loadingToggle(false))
}

const followUnfollowFunctionality = async (dispatch, userId, apiMethod) => {
    dispatch(followingInProgressToggle(true, userId))
    const payload = await apiMethod(userId)
    if (payload.resultCode === 0) {
        dispatch(followToggle(userId))
    }
    dispatch(followingInProgressToggle(false, userId))
}
export const follow = (userId) => (dispatch) => {
    const apiMethod = followAPI.follow
    followUnfollowFunctionality(dispatch, userId, apiMethod)

}

export const unfollow = (userId) => (dispatch) => {
    const apiMethod = followAPI.unfollow
    followUnfollowFunctionality(dispatch, userId, apiMethod)
}
export default usersReducer
