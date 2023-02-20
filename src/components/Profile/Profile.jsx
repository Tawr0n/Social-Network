import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../UI/Preloader/Preloader";
import React from "react";

const Profile = ({profile, status, updateStatus, updateImage, isOwner}) => {
    if (!profile) return <Preloader/>
    return (
        <div className={s.main}>
            <ProfileInfo profile={profile} status={status} isOwner={isOwner} updateStatus={updateStatus}
                         updateImage={updateImage}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
