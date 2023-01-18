import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const isActive = ({isActive}) => isActive ? s.link_active : s.link
const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.nav__links}>
                <li><NavLink className={isActive}
                             to="/Profile">Profile</NavLink></li>
                <li><NavLink className={isActive} to="/Messages">Messages</NavLink></li>
                <li><NavLink className={isActive} to="/News">News</NavLink></li>
                <li><NavLink className={isActive} to="/Music">Music</NavLink></li>
                <li><NavLink className={isActive} to="/Settings">Settings</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
