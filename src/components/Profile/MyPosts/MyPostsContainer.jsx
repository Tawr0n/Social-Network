import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = ({store}) => {
    const state = store.getState()

    const addPost = () => {
        store.dispatch(addPostAC())
    }
    const onPostChange = (text) => {
        store.dispatch(updateNewPostTextAC(text))
    }
    return <MyPosts posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}
                    addPost={addPost} updateNewPostText={onPostChange}/>
}

export default MyPostsContainer
