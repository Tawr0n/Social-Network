import s from './Friends.module.css'
import Friend from "./Friend/Friend";
import {FriendType} from "../../../types/types";
import React from "react";

type PropsType = {
    friends: Array<FriendType>
}
const Friends: React.FC<PropsType> = ({friends}) => {
    return (
        <div className={s.friends}>
            <h2 className={s.friends__title}>Friends</h2>
            <div className={s.friends__list}>
                {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
            </div>
        </div>
    )
}

export default Friends
