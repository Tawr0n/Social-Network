const SET_AUTHORIZED_USER_DATA = 'SET_AUTHORIZED_USER_DATA'


const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORIZED_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }

}
export const setAuthorizedUserData = (data) => ({
    type: SET_AUTHORIZED_USER_DATA,
    data
})

export default authReducer