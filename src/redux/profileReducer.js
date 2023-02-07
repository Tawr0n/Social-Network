import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
    posts: [
        {id: 1, message: 'Слизерин', likesCount: 41},
        {id: 2, message: 'Рейвенклов', likesCount: 59},
    ],
    newPostText: 'Ua',
    profile: null,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText.length !== 0) {
                const newPost = {
                    id: state.posts.length + 1,
                    message: state.newPostText,
                    likesCount: 0
                }
                return {
                    ...state,
                    posts: [...state.posts, newPost],
                    newPostText: '',

                }
            }
            return state

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }

}
export const addPost = () => ({
    type: ADD_POST,
})

export const updateNewPostText = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})

export const setUserProfile = profile => ({
    type: SET_USER_PROFILE,
    profile
})

export const getUserProfileData = (userId = 2) => {
    return dispatch => {
        profileAPI.getProfileData(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}
export default profileReducer
