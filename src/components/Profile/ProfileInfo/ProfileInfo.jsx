import React from "react";
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    return (
        <div>
            <div className={s.main__imgBlock}>
                <img
                    src="https://64.media.tumblr.com/e10123b95d3c4fdfc1e5a53beb0be5a7/588aba39c09f8322-a4/s1280x1920/6cc423179fb28e53335c536e5586bdd4543b68f1.jpg"
                    alt=""/>
            </div>
            <div className={s.main__profile}>
                <div className={s.main__avatar}>
                    <img src={profile.photos.large} alt="userImage"/>
                </div>
                <div className={s.main__info}>
                    <p>{`id: ${profile.userId}`}</p>
                    <p>{profile.fullName}</p>
                    <p>{profile.aboutMe}</p>
                    <p>{profile.lookingForAJobDescription}</p>
                    <p>{profile.contacts.instagram}</p>
                </div>
            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
}

export default React.memo(ProfileInfo)
