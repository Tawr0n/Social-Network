import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cd906c48-adc3-4a11-a812-33f5901c1670'
    },
})
export const usersAPI = {
    getUsers(activePage = 1, pageSize = 10) {
        return instance.get(`users?page=${activePage}&count=${pageSize}`)
            .then(response => response.data)
    },

}

export const followAPI = {
    follow(userId) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfileData(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    },
    updateProfileImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    updateProfile(profile) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    }
}
export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data)
    },
    login(loginData) {
        return instance.post('auth/login', loginData).then(response => response.data)
    },
    logout() {
        return instance.delete('auth/login').then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url').then(response => response.data)
    }
}
