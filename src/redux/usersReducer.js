import {followAPI, usersAPI} from "../api/api";

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE'
const SET_USERS = 'SET_STATE'
const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const LOADING_TOGGLE = 'LOADING_TOGGLE'
const FOLLOWING_IN_PROGRESS_TOGGLE = 'FOLLOWING_IN_PROGRESS_TOGGLE'

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
    pageSize: 5,
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
export const requestUsers = (activePage = 1, pageSize = 5, users) => {
    return dispatch => {
        if (users.length === 0) {
            dispatch(loadingToggle(true))

            usersAPI.getUsers(activePage, pageSize)
                .then(data => {
                    dispatch(setUsers(data.items))
                    dispatch(setTotalUsersCount(data.totalCount))
                    dispatch(loadingToggle(false))
                })
        }
    }
}
export const getUsersOnClick = (pageNumber = 1, pageSize = 5) => {
    return (dispatch) => {
        dispatch(setActivePage(pageNumber))
        dispatch(loadingToggle(true))

        usersAPI.getUsers(pageNumber, pageSize)
            .then(data => {
                dispatch(setUsers(data.items))
                dispatch(loadingToggle(false))
            })
    }
}
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgressToggle(true, userId))
        followAPI.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followToggle(userId))
                }
                dispatch(followingInProgressToggle(false, userId))
            })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgressToggle(true, userId))
        followAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followToggle(userId))
                }
                dispatch(followingInProgressToggle(false, userId))
            })
    }
}
export default usersReducer
