import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profilePage, dispatch}) => {
    return (
        <div className={s.main}>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} newPostText={profilePage.newPostText} dispatch={dispatch}/>
        </div>
    )
}

export default Profile
