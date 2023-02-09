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
    getProfileData(userId = 11) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data)
    }
}
