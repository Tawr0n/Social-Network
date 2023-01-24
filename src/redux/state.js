const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Слизерин', likesCount: 41},
                {id: 2, message: 'Рейвенклов', likesCount: 59},
            ],
            newPostText: 'Ua',
        },
        messagesPage: {
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
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'I`m here',
                    image: 'https://static.wikia.nocookie.net/e72fc2b5-60b4-46dc-8328-12dc0e94fd6b',
                },
                {
                    id: 2,
                    name: 'I`m here',
                    image: 'https://i.pinimg.com/736x/44/46/37/44463754b062f893b3999a774443ea3f.jpg',
                },
                {
                    id: 3,
                    name: 'I`m here',
                    image: 'https://pic1.mangapicgallery.com/r/essay/a0/md_/287370_14604575.jpg',
                },
            ]
        }
    },
    _callSubscriber() {
        console.log('no changes')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        switch (action.type) {
            case 'ADD_POST': {
                if (this._state.profilePage.newPostText.length !== 0) {
                    this._state.profilePage.posts.push({
                        id: this._state.profilePage.posts.length + 1,
                        message: this._state.profilePage.newPostText,
                        likesCount: 0
                    })
                    this._state.profilePage.newPostText = ''
                    this._callSubscriber()
                }
                break
            }
            case 'UPDATE_NEW_POST_TEXT': {
                this._state.profilePage.newPostText = action.newText
                this._callSubscriber()
                break
            }
            case 'SEND_MESSAGE': {
                if (this._state.messagesPage.newMessageText.length !== 0) {
                    this._state.messagesPage.messages.push({
                        id: this._state.messagesPage.messages.length + 1,
                        message: this._state.messagesPage.newMessageText,
                    })
                    this._state.messagesPage.newMessageText = ''
                    this._callSubscriber()
                }
                break
            }
            case 'UPDATE_NEW_MESSAGE_TEXT': {
                this._state.messagesPage.newMessageText = action.newMessage
                this._callSubscriber()
                break
            }
            default:
                break
        }
    }
}

export const addPostAC = () => ({
    type: ADD_POST,
})

export const updateNewPostTextAC = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})

export const sendMessageAC = () => ({
    type: SEND_MESSAGE,
})
export const updateNewMessageTextAC = (message) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: message,
})


export default store

window.store = store
