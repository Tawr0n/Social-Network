import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profilePage}) => {
    return (
        <div className={s.main}>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts}/>
        </div>
    )
}

export default Profile
