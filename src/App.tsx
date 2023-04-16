import './App.css';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import React, {Suspense, useEffect} from "react";
import {connect, Provider} from "react-redux";
import Preloader from "./components/UI/Preloader/Preloader";
import {actions, initializeApp} from "./redux/appReducer";
import store, {AppStateType} from "./redux/reduxStore";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LoginPage} from "./components/Login/LoginPage";
import AppHeader from "./components/Header/Header";

import {LaptopOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';


const UsersPage = React.lazy(() => import('./components/Users/UsersPage').then(module => ({default: module.UsersPage})));
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage').then(module => ({default: module.ChatPage})));


type TStateProps = {
    isInitialized: boolean
    globalErrors: Array<string>
}
type TDispatchProps = {
    initializeApp: () => void
    addGlobalError: (errorMessage: string) => void
    removeGlobalError: () => void
}
type TOwnProps = {
    state: AppStateType
}
type PropsType = TStateProps & TDispatchProps & TOwnProps


const {Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('My profile', 'My profile', <UserOutlined/>, [
        getItem(<Link to="/profile">Profile</Link>, 'Profile'),
        {type: 'divider'},
        getItem(<Link to="/messages">Messages</Link>, 'Messages')
    ]),
    {type: 'divider'},
    getItem('Developers', 'Developers', <LaptopOutlined/>, [
        getItem(<Link to="/developers">Users</Link>, 'Users'),
        getItem(<Link to="/chat">Chat</Link>, 'Chat'),
    ]),
    {type: 'divider'},
    getItem('Setting', 'sub4', <SettingOutlined/>, [
        getItem(<Link to="/settings">Settings</Link>, 'Settings')
    ])
];

const App: React.FC<PropsType> = (props) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        let errorMessage = e.reason.message
        props.addGlobalError(errorMessage)
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => props.removeGlobalError()
        })
    }
    const catchAllErrors = (e: ErrorEvent) => {
        let errorMessage = e.message
        props.addGlobalError(errorMessage)
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => props.removeGlobalError()
        })
    }

    useEffect(() => {
        props.initializeApp()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
        window.addEventListener("error", catchAllErrors)
        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
            window.removeEventListener("error", catchAllErrors)
        }
    }, [])

    if (!props.isInitialized) return <Preloader/>
    return (
        <Layout>
            <AppHeader items={items}/>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['Profile']}
                            defaultOpenKeys={['My profile']}
                            style={{height: '100%'}}
                            items={items}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path={'/profile/:userId?'} element={<ProfileContainer/>}/>
                                <Route path={'/messages'} element={<MessagesContainer/>}>
                                    <Route path={'*'} element={<MessagesContainer/>}/>
                                </Route>
                                <Route path={'/developers'} element={<UsersPage/>}/>
                                <Route path={'/news'} element={<News/>}/>
                                <Route path={'/music'} element={<Music/>}/>
                                <Route path={'/settings'} element={<Settings/>}/>
                                <Route path={'/login'} element={<LoginPage/>}/>
                                <Route path={'/chat'} element={<ChatPage/>}/>
                                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                                <Route path="*" element={<div style={{color: "red", padding: "10px"}}>404 not
                                    found</div>}/>
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

const mapStateToProps = (state: AppStateType): TStateProps => ({
    isInitialized: state.app.isInitialized,
    globalErrors: state.app.globalErrors
})
const AppContainer = connect<TStateProps, TDispatchProps, TOwnProps, AppStateType>(mapStateToProps, {
    initializeApp,
    addGlobalError: actions.addGlobalError,
    removeGlobalError: actions.removeGlobalError
})(App);

const AppContainerWrapper: React.FC = () => {
    return (
        // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer state={store.getState()}/>
            </Provider>
        </BrowserRouter>
        // </React.StrictMode>
    )
}
export default AppContainerWrapper
