import s from './Navigation.module.css'
import {NavLink} from "react-router-dom";

const isActive = ({isActive}) => isActive ? s.link_active : s.link
const Navigation = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.nav__links}>
                <li><NavLink className={isActive} to="/profile">Profile</NavLink></li>
                <li><NavLink className={isActive} to="/messages">Messages</NavLink></li>
                <li><NavLink className={isActive} to="/users">Users</NavLink></li>
                <li><NavLink className={isActive} to="/news">News</NavLink></li>
                <li><NavLink className={isActive} to="/music">Music</NavLink></li>
                <li><NavLink className={isActive} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation
