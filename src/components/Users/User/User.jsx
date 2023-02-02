import React from 'react';
import s from '../Users.module.css'
import userBaseImage from '../../../images/userBaseImage.jpg'
import {Link} from "react-router-dom";
import axios from "axios";

const User = (props) => {
    const onFollowClick = () => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'cd906c48-adc3-4a11-a812-33f5901c1670'
            }
        }).then(response => {
            if (response.data.resultCode === 0) {
                props.followToggle(props.id)
            }
        })
    }
    const onUnfollowClick = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'cd906c48-adc3-4a11-a812-33f5901c1670'
            }
        }).then(response => {
            if (response.data.resultCode === 0) {
                props.followToggle(props.id)
            }
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
                    <button onClick={props.followed ? onUnfollowClick : onFollowClick}>
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
