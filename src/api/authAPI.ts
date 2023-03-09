import {LoginDataType} from "../types/types";
import {instance, APIResponseType, ResultCodeWithCaptchaType} from "./api";

type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<AuthMeResponseDataType>>('auth/me').then(res => res.data)
    },
    login(loginData: LoginDataType) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeWithCaptchaType>>('auth/login', loginData).then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>('auth/login').then(res => res.data)
    }
}
