import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul>
                <li><a className={`${s.link} ${s.active}`} href="#">Profile</a></li>
                <li><a className={s.link} href="#">Messages</a></li>
                <li><a className={s.link} href="#">News</a></li>
                <li><a className={s.link} href="#">Music</a></li>
                <li><a className={s.link} href="#">Settings</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
