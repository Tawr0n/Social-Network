import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../UI/Preloader/Preloader";
import {Navigate} from "react-router-dom";
import React from "react";

const Profile = ({profile, isAuth}) => {
    if (!isAuth) {
        return <Navigate to='/login'/>
    } else if (!profile) {
        return <Preloader/>
    }
    return (
        <div className={s.main}>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
