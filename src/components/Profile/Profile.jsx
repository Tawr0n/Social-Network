import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profilePage, addPost}) => {
    return (
        <div className={s.main}>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} addPost={addPost}/>
        </div>
    )
}

export default Profile
