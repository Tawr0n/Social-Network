import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul>
                <li><a className={`${s.link} ${s.active}`} href="/Profile">Profile</a></li>
                <li><a className={s.link} href="/Messages">Messages</a></li>
                <li><a className={s.link} href="/News">News</a></li>
                <li><a className={s.link} href="/Music">Music</a></li>
                <li><a className={s.link} href="/Settings">Settings</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
