import './index.css';
import {rerenderEntireTree} from "./render";
import state, {addPost, sendMessage, updateNewMessageText, updateNewPostText} from "./redux/state";

rerenderEntireTree(state, addPost, updateNewPostText, sendMessage, updateNewMessageText)

