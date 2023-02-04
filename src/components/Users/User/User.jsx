import React from 'react';
import s from '../Users.module.css'
import userBaseImage from '../../../images/userBaseImage.jpg'
import {Link} from "react-router-dom";
import {followAPI} from "../../../api/api";

const User = (props) => {
    const onFollowClick = () => {
        props.followingInProgressToggle(true, props.id)
        followAPI.follow(props.id)
            .then(data => {
                if (data.resultCode === 0) {
                    props.followToggle(props.id)
                }
                props.followingInProgressToggle(false, props.id)
            })
    }
    const onUnfollowClick = () => {
        props.followingInProgressToggle(true, props.id)
        followAPI.unfollow(props.id)
            .then(data => {
                if (data.resultCode === 0) {
                    props.followToggle(props.id)
                }
                props.followingInProgressToggle(false, props.id)
            })
    }
    return (
        <div className={s.user}>
            <div className={s.profile}>
                <div className={s.avatarBlock}>
                    <Link to={`/profile/${props.id}`}>
                        <img src={props.photos.small ? props.photos.small : userBaseImage} alt="userImage"/>
                    </Link>
                </div>
                <div>
                    <button disabled={props.followingInProgress.some(id => id === props.id)}
                            onClick={props.followed ? onUnfollowClick : onFollowClick}>
                        {props.followed ? 'Unfollow' : 'Follow'}
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
