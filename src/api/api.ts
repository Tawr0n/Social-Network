import axios from "axios";
import {
    LoginDataType,
    PhotosType,
    ProfileType,
    ResultCodesEnum,
    ResultCodesWithCaptcha,
    UserType
} from "../types/types";

interface BasicResponseType {
    resultCode: ResultCodesEnum
    messages: Array<string>
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cd906c48-adc3-4a11-a812-33f5901c1670'
    },
})

interface GetUsersResponseType {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(activePage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${activePage}&count=${pageSize}`)
            .then(response => response.data)
    },
}


interface FollowUnfollowResponseType extends BasicResponseType {
    data: {}
}

export const followAPI = {
    follow(userId: number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}

interface UpdateStatusResponseType extends BasicResponseType {
    data: {}
}

interface UpdateImageResponseType extends BasicResponseType {
    data: { photos: PhotosType }
}

interface UpdateProfileResponseType extends BasicResponseType {
    data: {}
}

export const profileAPI = {
    getProfileData(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, {status})
            .then(response => response.data)
    },
    updateProfileImage(imageFile: File) {
        const formData = new FormData();
        formData.append('image', imageFile)
        return instance.put<UpdateImageResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<UpdateProfileResponseType>(`profile`, profile)
            .then(response => response.data)
    }
}


interface AuthMeResponseType extends BasicResponseType {
    data: {
        id: number
        email: string
        login: string
    }
}

interface LoginResponseType extends BasicResponseType {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum & ResultCodesWithCaptcha
}

interface LogoutResponseType extends BasicResponseType {
    data: {}
}

export const authAPI = {
    authMe() {
        return instance.get<AuthMeResponseType>('auth/me').then(response => response.data)
    },
    login(loginData: LoginDataType) {
        return instance.post<LoginResponseType>('auth/login', loginData).then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(response => response.data)
    }
}

interface GetCaptchaUrlResponseType {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url').then(response => response.data)
    }
}
