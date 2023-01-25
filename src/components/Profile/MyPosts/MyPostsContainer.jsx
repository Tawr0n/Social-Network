import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {Consumer} from "../../../context/StoreContext";


const MyPostsContainer = () => {
    return (
        <Consumer>
            {
                store => {
                    const state = store.getState()

                    const addPost = () => {
                        store.dispatch(addPostAC())
                    }
                    const onPostChange = (text) => {
                        store.dispatch(updateNewPostTextAC(text))
                    }
                    return (
                        <MyPosts posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}
                                 addPost={addPost} updateNewPostText={onPostChange}/>
                    )
                }
            }
        </Consumer>

    )
}

export default MyPostsContainer
