import {rerenderEntireTree} from "../render";

const state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Слизерин', likesCount: 41},
            {id: 2, message: 'Рейвенклов', likesCount: 59},
        ],
        newPostText: 'Ua',
    },
    messagesPage: {
        dialogs: [
            {id: 1, name: 'Албус', text: 'Прибуду о 20:00 у суботу'},
            {id: 2, name: 'Северус', text: 'І не забудь.'},
            {id: 3, name: 'Рон', text: 'Як життя, старий?'},
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
}

export const addPost = () => {
    if (state.profilePage.newPostText.length !== 0) {
        state.profilePage.posts.push({
            id: state.profilePage.posts.length + 1,
            message: state.profilePage.newPostText,
            likesCount: 0
        })
        state.profilePage.newPostText = ''
        rerenderEntireTree(state, addPost, updateNewPostText, sendMessage, updateNewMessageText)
    }

}
export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state, addPost, updateNewPostText, sendMessage, updateNewMessageText)
}

export const sendMessage = () => {
    if (state.messagesPage.newMessageText.length !== 0) {
        state.messagesPage.messages.push({
            id: state.messagesPage.messages.length + 1,
            message: state.messagesPage.newMessageText,
        })
        state.messagesPage.newMessageText = ''
        rerenderEntireTree(state, addPost, updateNewPostText, sendMessage, updateNewMessageText)
    }
}
export const updateNewMessageText = (newText) => {
    state.messagesPage.newMessageText = newText
    rerenderEntireTree(state, addPost, updateNewPostText, sendMessage, updateNewMessageText)
}

export default state

window.state = state
