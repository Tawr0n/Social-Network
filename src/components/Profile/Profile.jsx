import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profilePage, addPost, updateNewPostText}) => {
    return (
        <div className={s.main}>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} newPostText={profilePage.newPostText} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </div>
    )
}

export default Profile
