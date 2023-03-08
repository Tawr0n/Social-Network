import {profileAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType, ResultCodesEnum} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";

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


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    addPost: (newPostText: string) => ({
        type: ADD_POST,
        newPostText
    } as const),
    deletePost: (postId: number) => ({
        type: DELETE_POST,
        postId
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE,
        profile
    } as const),
    setStatus: (status: string) => ({
        type: SET_STATUS,
        status
    } as const),
    updateImageSuccess: (photos: PhotosType) => ({
        type: UPDATE_IMAGE_SUCCESS,
        photos
    } as const)
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>
export const getUserProfileData = (userId: number): ThunkType => async (dispatch) => {
    const payload = await profileAPI.getProfileData(userId)
    dispatch(actions.setUserProfile(payload))
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const payload = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(payload.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const payload = await profileAPI.updateStatus(status)
        if (payload.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (e) {
        throw new Error('Updating status error')
    }
}
export const updateImage = (avatarImage: File): ThunkType => async (dispatch) => {
    const payload = await profileAPI.updateProfileImage(avatarImage)
    if (payload.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.updateImageSuccess(payload.data.photos))
    }
}

export const updateProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const id = getState().auth.id
    const payload = await profileAPI.updateProfile(profileData)
    if (payload.resultCode === ResultCodesEnum.Success && id) {
        dispatch(getUserProfileData(id))
    } else {
        const errorMessage = payload.messages.length > 0 ? payload.messages : 'Error'
        dispatch(stopSubmit('profileData', {_error: errorMessage}))
        return Promise.reject(errorMessage)
    }
}
export default profileReducer
