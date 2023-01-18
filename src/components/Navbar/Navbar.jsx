import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul>
                <li><a className={`${s.link} ${s.active}`} href="src/components/Navbar/Navbar#">Profile</a></li>
                <li><a className={s.link} href="src/components/Navbar/Navbar#">Messages</a></li>
                <li><a className={s.link} href="src/components/Navbar/Navbar#">News</a></li>
                <li><a className={s.link} href="src/components/Navbar/Navbar#">Music</a></li>
                <li><a className={s.link} href="src/components/Navbar/Navbar#">Settings</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
