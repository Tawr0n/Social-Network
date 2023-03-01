import s from './Sidebar.module.css'
import Navigation from "./Navigation/Navigation";
import Friends from "./Friends/Friends";
import {FC} from "react";
import {FriendType} from "../../types/types";

type PropsType = {
    sidebar: {
        friends: Array<FriendType>
    }
}
const Sidebar: FC<PropsType> = ({sidebar}) => {
    return (
        <aside className={s.sidebar}>
            <Navigation/>
            <Friends friends={sidebar.friends}/>
        </aside>

    )
}

export default Sidebar
