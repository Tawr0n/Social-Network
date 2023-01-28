import React from 'react';
import s from '../Users.module.css'

const User = (props) => {
    return (
        <div className={s.user}>
            <div className={s.profile}>
                <div className={s.avatarBlock}><img src={props.image} alt=""/></div>
                <div>
                    <button onClick={() => props.followToggle(props.id)}>
                        {props.isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
            <div className={s.description}>

                <div>{props.fullName}</div>
                <div>{props.status}</div>
                <div className={s.country}>{props.location.country}</div>
                <div className={s.city}>{props.location.city}</div>

            </div>
        </div>
    )
}

export default User;
