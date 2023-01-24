const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

const messagesReducer = (state, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            if (state.newMessageText.length !== 0) {
                state.messages.push({
                    id: state.messages.length + 1,
                    message: state.newMessageText,
                })
                state.newMessageText = ''
            }
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage
            return state
        default:
            return state
    }


}
export const sendMessageAC = () => ({
    type: SEND_MESSAGE,
})
export const updateNewMessageTextAC = (message) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: message,
})
export default messagesReducer
