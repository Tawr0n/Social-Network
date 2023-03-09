import {actions} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {PostType} from "../../../types/types";

type TStateProps = {
    posts: Array<PostType>
}
type TDispatchProps = {
    addPost: (newPostText: string) => void
}
type TOwnProps = {}
export type MyPostsPropsType = TStateProps & TDispatchProps & TOwnProps
const mapStateToProps = (state: AppStateType): TStateProps => ({
    posts: state.profilePage.posts
})

const MyPostsContainer = connect<TStateProps, TDispatchProps, TOwnProps, AppStateType>(mapStateToProps, {
    ...actions
})(MyPosts)

export default MyPostsContainer
