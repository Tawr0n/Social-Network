import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../UI/Preloader/Preloader";
import React from "react";

const Profile = ({profile, status, isOwner, updateStatus, updateImage, updateProfile}) => {
    if (!profile) return <Preloader/>
    return (
        <div className={s.main}>
            <ProfileInfo profile={profile} status={status} isOwner={isOwner} updateStatus={updateStatus}
                         updateImage={updateImage} updateProfile={updateProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
