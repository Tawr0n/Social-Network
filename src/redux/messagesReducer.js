const SEND_MESSAGE = 'messages/SEND_MESSAGE'

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
}
const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.newMessage) {
                const newMessage = {
                    id: state.messages.length + 1,
                    message: action.newMessage,
                }
                return {
                    ...state,
                    messages: [...state.messages, newMessage]
                }
            }
            return state
        default:
            return state
    }


}
export const sendMessage = (newMessage) => ({
    type: SEND_MESSAGE,
    newMessage
})
export default messagesReducer
