const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE'
const SET_USERS = 'SET_STATE'

const initialState = {
    users: [/*{
        id: 1,
        fullName: 'Kit Yaroslav',
        image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
        isFollowed: true,
        status: 'I`m a ukrainian',
        location: {country: 'Ukraine', city: 'Lviv'}
    },
        {
            id: 2,
            fullName: 'Pennings Daniel',
            image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
            isFollowed: false,
            status: 'Летючий голандець',
            location: {country: 'Ukraine', city: 'Lviv'}
        },*/]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_TOGGLE:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            isFollowed: !u.isFollowed
                        }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }


}
export const followToggleAC = (userId) => ({
    type: FOLLOW_TOGGLE,
    userId
})
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users
})

export default usersReducer
