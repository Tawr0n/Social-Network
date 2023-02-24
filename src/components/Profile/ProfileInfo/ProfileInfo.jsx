import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import baseProfileImage from './../../../images/userBaseImage.jpg'
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = ({profile, status, isOwner, updateStatus, updateImage, updateProfile}) => {

    const [editMode, setEditMode] = useState(false)
    const onAvatarImageSelected = (e) => {
        if (e.target.files.length) {
            updateImage(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        console.log(formData)
        // Тут є нюанс. UI не повинен чекати, поки щось у BLL виконається. Маємо зробити dispatch і забути.
        updateProfile(formData).then(() => {
            setEditMode(false)
        })
    }
    return (
        <div>
            <div className={s.main__imgBlock}>
                <img
                    src="https://64.media.tumblr.com/e10123b95d3c4fdfc1e5a53beb0be5a7/588aba39c09f8322-a4/s1280x1920/6cc423179fb28e53335c536e5586bdd4543b68f1.jpg"
                    alt=""/>
            </div>
            <div className={s.main__profile}>
                <div className={s.main__profileImage}>
                    <img src={profile.photos.large ? profile.photos.large : baseProfileImage}
                         alt="profileImage"/>
                    {
                        isOwner && <input onChange={onAvatarImageSelected} type='file'/>
                    }
                </div>
                {editMode
                    ?
                    <ProfileDataReduxForm initialValues={profile} profile={profile} setEditMode={setEditMode}
                                          onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} setEditMode={setEditMode}/>
                }


            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
        </div>
    )
}
const ProfileData = ({profile, isOwner, setEditMode}) => {
    return (
        <div className={s.info}>
            <div className={s.info__list}>
                <div className={s.info__item}>
                    <span className={s.item__title}>Id:</span>
                    <span className={s.item__value}>{profile.userId}</span>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>Full name:</span>
                    <span className={s.item__value}>{profile.fullName}</span>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>About me:</span>
                    <span className={s.item__value}>{profile.aboutMe}</span>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>My technology stack:</span>
                    <span className={s.item__value}>{profile.lookingForAJobDescription}</span>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>Looking for a job:</span>
                    <span className={s.item__value}>{profile.lookingForAJob ? '✔' : '❌'}</span>
                </div>

                <div className={s.info__item}>
                    <div className={s.contacts__title}>
                        <span className={s.item__title}>Contacts:</span>
                    </div>
                    <ul className={s.contacts__list}>
                        {Object.entries(profile.contacts)
                            .filter(contact => contact[1])
                            .map(contact => <Contact contactTitle={contact[0]} contactValue={contact[1]}
                                                     key={contact[0]}/>
                            )}
                    </ul>
                </div>
            </div>
            {isOwner &&
                <div>
                    <button onClick={() => setEditMode(true)} className={s.info__button}>Edit</button>
                </div>
            }
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <li className={s.contacts__item}>
            <a className={s.contacts__link} href={contactValue} rel="noopener noreferrer" target='_blank'>{contactTitle}</a>
        </li>
    );
};

export default React.memo(ProfileInfo)
