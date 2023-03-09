import s from '../Friends.module.css'
import {FriendType} from "../../../../types/types";
import React from "react";

type PropsType = {
    friend: FriendType
}
const Friend: React.FC<PropsType> = ({friend}) => {
    return (
        <div className={s.friend}>
            <div className={s.friend__avatar}>
                <img src={friend.image} alt="ava"/>
            </div>
            <div className={s.friend__fullName}>{friend.name}</div>
        </div>
    )
}

export default Friend
