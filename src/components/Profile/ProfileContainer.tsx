import React from "react";
import Profile from "./Profile";
import {Navigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/reduxStore";
import {getAuthorizedUserId} from "../../redux/authSelectors";

const ProfilePage: React.FC = () => {
    const authorizedUserId = useAppSelector(getAuthorizedUserId)
    const params = useParams()
    if (!params.userId && !authorizedUserId) {
        return <Navigate to={'/login'}/>
    }
    return <Profile authorizedUserId={authorizedUserId}/>
}

export default ProfilePage
