import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../UI/Preloader/Preloader";
import React from "react";

const Profile = ({profile, status, updateStatus}) => {
    if (!profile) return <Preloader/>
    return (
        <div className={s.main}>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
