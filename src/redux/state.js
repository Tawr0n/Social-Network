import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import sidebarReducer from "./sidebarReducer";

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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber()
    }
}


export default store

window.store = store
