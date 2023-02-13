import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

const initialState = {
    posts: [
        {id: 1, message: 'Слизерин', likesCount: 41},
        {id: 2, message: 'Рейвенклов', likesCount: 59},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (action.newPostText) {
                const newPost = {
                    id: state.posts.length + 1,
                    message: action.newPostText,
                    likesCount: 0
                }
                return {
                    ...state,
                    posts: [...state.posts, newPost]
                }
            }
            return state
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }

}
export const addPost = (newPostText) => ({
    type: ADD_POST,
    newPostText
})

export const setUserProfile = profile => ({
    type: SET_USER_PROFILE,
    profile
})
export const setStatus = status => ({
    type: SET_STATUS,
    status
})

export const getUserProfileData = (userId) => {
    return dispatch => {
        profileAPI.getProfileData(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}
export const getUserStatus = (userId) => dispatch => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })

}
export const updateStatus = (status) => dispatch => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })

}
export default profileReducer
