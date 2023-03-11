import usersReducer, {actions, InitialStateType} from "./usersReducer";

let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Yare 0', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Yare 1', followed: false,
                photos: {small: null, large: null}, status: 'status 1'
            },
            {
                id: 2, name: 'Yare 2', followed: true,
                photos: {small: null, large: null}, status: 'status 2'
            },
            {
                id: 3, name: 'Yare 3', followed: true,
                photos: {small: null, large: null}, status: 'status 3'
            },
        ],
        totalUsersCount: 0,
        pageSize: 5,
        activePage: 1,
        isLoading: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})

test('following should be successful', () => {
    const newState = usersReducer(state, actions.followToggle(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollowing should be successful', () => {
    const newState = usersReducer(state, actions.followToggle(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
