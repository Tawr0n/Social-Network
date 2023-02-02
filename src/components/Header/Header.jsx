import s from './Header.module.css'
import {Link} from "react-router-dom";

const Header = ({authData}) => {
    return (
        <header className={s.header}>
            <div className={s.header__logo}>
                <img
                    src="https://wowletsparty.com//image/cache/catalog/CATALOG%20_%202020/Harry%20Potter/551890%209%20IN-835x835.jpg"
                    alt="logo"/>
            </div>
            <div className={s.header__login}>
                {
                    authData.isAuth
                        ? <span>{authData.login}</span>
                        : <Link to={'/login'}>
                            Login
                        </Link>
                }

            </div>
        </header>
    )
}

export default Header
