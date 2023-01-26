const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

const initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Албус',
            text: 'Прибуду о 20:00 у суботу',
            image: 'https://images.ctfassets.net/usf1vwtuqyxm/1dmmUJzpRcWaUmMOCu8QwO/7e013145694566076d47fd004fd604c2/AlbusDumbledore_WB_F6_DumbledoreSittingInChair_Promo_080615_Port.jpg',
        },
        {
            id: 2,
            name: 'Северус',
            text: 'І не забудь.',
            image: 'https://kartinkin.net/uploads/posts/2022-09/1662417459_1-kartinkin-net-p-severus-sneip-arti-vkontakte-1.jpg',
        },
        {
            id: 3,
            name: 'Рон',
            text: 'Як життя, старий?',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg',
        },
    ],
    messages: [
        {id: 1, message: 'Експеліармус'},
        {id: 2, message: 'Акціо'},
    ],
    newMessageText: '',
}
const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (state.newMessageText.length !== 0) {
                const newMessage = {
                    id: state.messages.length + 1,
                    message: state.newMessageText,
                }
                return {
                    ...state,
                    messages: [...state.messages, newMessage],
                    newMessageText: '',
                }
            }
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage,
            }
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
