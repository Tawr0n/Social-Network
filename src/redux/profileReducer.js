const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText.length !== 0) {
                state.posts.push({
                    id: state.posts.length + 1,
                    message: state.newPostText,
                    likesCount: 0
                })
                state.newPostText = ''
            }
            return state

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }

}
export const addPostAC = () => ({
    type: ADD_POST,
})

export const updateNewPostTextAC = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})
export default profileReducer
