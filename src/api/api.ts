import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cd906c48-adc3-4a11-a812-33f5901c1670'
    },
})


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesWithCaptcha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
export type ResultCodeWithCaptchaType = ResultCodesEnum | ResultCodesWithCaptcha
