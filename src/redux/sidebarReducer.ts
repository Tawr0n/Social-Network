import {FriendType} from "../types/types";

const initialState: InitialStateType = {
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

const sidebarReducer = (state = initialState, action: any): InitialStateType => {

    return state
}

export default sidebarReducer

type InitialStateType = {
    friends: Array<FriendType>
}
