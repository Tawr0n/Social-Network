import React from 'react';
import s from '../Users.module.css'
import userBaseImage from '../../../images/userBaseImage.jpg'
import {Link} from "react-router-dom";
import {UserType} from "../../../types/types";

type PropsType = {
    user: UserType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
}
const User: React.FC<PropsType> = (props) => {
    const onFollowClick = () => {
        props.follow(props.user.id)
    }
    const onUnfollowClick = () => {
        props.unfollow(props.user.id)
    }
    return (
        <div className={s.user}>
            <div className={s.profile}>
                <div className={s.avatarBlock}>
                    <Link to={`/profile/${props.user.id}`}>
                        <img src={props.user.photos.small ? props.user.photos.small : userBaseImage}
                             alt="userImage"/>
                    </Link>
                </div>
                <div>
                    <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                            onClick={props.user.followed ? onUnfollowClick : onFollowClick}>
                        {props.user.followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
            <div className={s.description}>

                <div>{props.user.name}</div>
                <div>{props.user.status ? props.user.status : 'Support Ukraine'}</div>
                <div className={s.country}>{'props.location.country'}</div>
                <div className={s.city}>{'props.location.city'}</div>

            </div>
        </div>
    )
}

export default User;
