import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../UI/Preloader/Preloader";
import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {getProfile} from "../../redux/profileSelectors";
import {getUserProfileData, getUserStatus} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";

type PropsType = {
    authorizedUserId: number | null
}
const Profile: FC<PropsType> = (props) => {
    console.log('profile')
    const profile = useAppSelector(getProfile)
    const dispatch = useAppDispatch()
    const params = useParams()

    const refreshProfile = (userId: number | null) => {
        if (userId) {
            dispatch(getUserProfileData(userId))
            dispatch(getUserStatus(userId))
        } else {
            console.error('Id must exists in URI params or in state (\'authorizedUserId\')')
        }
    }


    useEffect(() => {
        let userId: number | null = Number(params.userId)
        if (!userId) userId = props.authorizedUserId
        refreshProfile(userId)
    }, [params.userId])


    if (!profile) return <Preloader/>
    return (
        <div className={s.main}>
            <ProfileInfo profile={profile} isOwner={!params.userId}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
