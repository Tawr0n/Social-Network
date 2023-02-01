import React from 'react';
import s from '../Users.module.css'
import userBaseImage from '../../../images/userBaseImage.jpg'
import {Link} from "react-router-dom";

const User = (props) => {
    return (
        <div className={s.user}>
            <div className={s.profile}>
                <div className={s.avatarBlock}>
                    <Link to={`/profile/${props.id}`}>
                        <img src={props.photos.small ? props.photos.small : userBaseImage} alt="userImage"/>
                    </Link>
                </div>
                <div>
                    <button onClick={() => props.followToggle(props.id)}>
                        {props.isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
            <div className={s.description}>

                <div>{props.name}</div>
                <div>{props.status ? props.status : 'Support Ukraine'}</div>
                <div className={s.country}>{'props.location.country'}</div>
                <div className={s.city}>{'props.location.city'}</div>

            </div>
        </div>
    )
}

export default User;
