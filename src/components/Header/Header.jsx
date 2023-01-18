import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header__logo}>
                <img
                     src="https://wowletsparty.com//image/cache/catalog/CATALOG%20_%202020/Harry%20Potter/551890%209%20IN-835x835.jpg"
                     alt="logo"/>
            </div>
        </header>
    )
}

export default Header
