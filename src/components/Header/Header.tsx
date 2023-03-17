import s from './Header.module.css'
import {Link} from "react-router-dom";
import {logout} from "../../redux/authReducer";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {selectIsAuth, selectLogin} from "../../redux/authSelectors";

import {Avatar, Col, Menu, MenuProps, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

type PropsType = {
    items: MenuProps['items']
}

const AppHeader: React.FC<PropsType> = ({items}) => {
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectLogin)
    const dispatch = useAppDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">
            <Row>
                <Col span={16}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items}/>
                </Col>
                <Col span={8}>
                    <Row justify={"end"}>
                        <Col>
                            {
                                isAuth
                                    ? <div className={s.loginBlock}>
                                        <span className={s.login__text}>{login}</span>
                                        <button onClick={logoutCallback} className={s.buttonLogout}>
                                            Log out
                                        </button>
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </div>
                                    : <Link to={'/login'}>
                                        <button className={s.buttonLogin}>Log in</button>
                                    </Link>
                            }

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
        /* <header className={s.header}>
             <div className={s.header__logo}>
                 <img
                     src="https://wowletsparty.com//image/cache/catalog/CATALOG%20_%202020/Harry%20Potter/551890%209%20IN-835x835.jpg"
                     alt="logo"/>
             </div>
             <div className={s.header__login}>


             </div>
         </header>*/
    )
}

export default AppHeader
