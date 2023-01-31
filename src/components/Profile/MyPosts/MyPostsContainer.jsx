import {addPost, updateNewPostText} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
})

/*const mapDispatchToProps = (dispatch) => ({
    addPost: () => {
        dispatch(addPostAC())
    },
    updateNewPostText: (text) => {
        dispatch(updateNewPostTextAC(text))
    },
})*/
const MyPostsContainer = connect(mapStateToProps, {addPost, updateNewPostText})(MyPosts)

export default MyPostsContainer
