import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const UPDATE_IMAGE_SUCCESS = 'profile/UPDATE_IMAGE_SUCCESS'


const initialState = {
    posts: [
        {id: 1, message: 'Слизерин', likesCount: 41},
        {id: 2, message: 'Рейвенклов', likesCount: 59},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}
type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case UPDATE_IMAGE_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }

}
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({
    type: ADD_POST,
    newPostText
})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS,
    status
})
type UpdateImageSuccessActionType = {
    type: typeof UPDATE_IMAGE_SUCCESS
    photos: PhotosType
}
const updateImageSuccess = (photos: PhotosType): UpdateImageSuccessActionType => ({
    type: UPDATE_IMAGE_SUCCESS,
    photos
})

export const getUserProfileData = (userId: number) => async (dispatch: any) => {
    const payload = await profileAPI.getProfileData(userId)
    dispatch(setUserProfile(payload))
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
    const payload = await profileAPI.getStatus(userId)
    dispatch(setStatus(payload.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const payload = await profileAPI.updateStatus(status)
        if (payload.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (e) {
        throw new Error('Updating status error')
    }
}
export const updateImage = (avatarImage: File) => async (dispatch: any) => {
    const payload = await profileAPI.updateProfileImage(avatarImage)
    if (payload.resultCode === 0) {
        dispatch(updateImageSuccess(payload.data.photos))
    }
}
export const updateProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const id = getState().auth.id
    const payload = await profileAPI.updateProfile(profileData)
    if (payload.resultCode === 0) {
        dispatch(getUserProfileData(id))
    } else {
        const errorMessage = payload.messages.length > 0 ? payload.messages : 'Error'
        dispatch(stopSubmit('profileData', {_error: errorMessage}))
        return Promise.reject(errorMessage)
    }
}
export default profileReducer
