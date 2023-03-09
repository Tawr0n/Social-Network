import s from './Header.module.css'
import {Link} from "react-router-dom";
import {InitialAuthStateType} from "../../redux/authReducer";
import React from "react";

type PropsType = {
    authData: InitialAuthStateType,
    logout: () => void
}
const Header: React.FC<PropsType> = ({authData, logout}) => {
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
                        ? <div className={s.loginBlock}>
                            <span className={s.login__text}>{authData.login}</span>
                            <button onClick={logout} className={s.buttonLogout}>Log out</button>
                        </div>
                        : <Link to={'/login'}>
                            <button className={s.buttonLogin}>Log in</button>
                        </Link>
                }

            </div>
        </header>
    )
}

export default Header
