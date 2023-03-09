import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {InferActionsTypes, ThunkType} from "./reduxStore";
import {profileAPI} from "../api/profileAPI";
import {ResultCodesEnum} from "../api/api";

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


export const getUserProfileData = (userId: number): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await profileAPI.getProfileData(userId)
    dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId: number): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data.data))
}
export const updateStatus = (status: string): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (e) {
        throw new Error('Updating status error')
    }
}
export const updateImage = (avatarImage: File): ThunkType<ActionsTypes> => async (dispatch) => {
    const data = await profileAPI.updateProfileImage(avatarImage)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.updateImageSuccess(data.data.photos))
    }
}

export const updateProfile = (profileData: ProfileType): ThunkType<ActionsTypes | FormAction> => async (dispatch, getState) => {
    const id = getState().auth.id
    const data = await profileAPI.updateProfile(profileData)
    if (data.resultCode === ResultCodesEnum.Success && id) {
        dispatch(getUserProfileData(id))
    } else {
        const errorMessage = data.messages.length > 0 ? data.messages : 'Error'
        dispatch(stopSubmit('profileData', {_error: errorMessage}))
        return Promise.reject(errorMessage)
    }
}
export default profileReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

