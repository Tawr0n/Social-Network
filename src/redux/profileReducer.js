import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'

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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        default:
            return state
    }

}
export const addPost = (newPostText) => ({
    type: ADD_POST,
    newPostText
})
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})
export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})

export const getUserProfileData = (userId) => async (dispatch) => {
    const payload = await profileAPI.getProfileData(userId)
    dispatch(setUserProfile(payload))
}
export const getUserStatus = (userId) => async (dispatch) => {
    const payload = await profileAPI.getStatus(userId)
    dispatch(setStatus(payload.data))
}
export const updateStatus = (status) => async (dispatch) => {
    const payload = await profileAPI.updateStatus(status)
    if (payload.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export default profileReducer
