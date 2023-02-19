import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import Preloader from "./components/UI/Preloader/Preloader";
import {initializeApp} from "./redux/appReducer";
import store from "./redux/reduxStore";

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        let {state, isInitialized} = this.props;
        if (!isInitialized) return <Preloader/>
        return (
            <div className="wrapper">
                <div className="wrapper__container">
                    <HeaderContainer/>
                    <Sidebar sidebar={state.sidebar}/>
                    <main className={'content'}>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path={'/profile/:userId?'} element={<ProfileContainer/>}/>
                                <Route path={'/messages'} element={<MessagesContainer/>}>
                                    <Route path={'*'} element={<MessagesContainer/>}/>
                                </Route>
                                <Route path={'/users'} element={<UsersContainer/>}/>
                                <Route path={'/news'} element={<News/>}/>
                                <Route path={'/music'} element={<Music/>}/>
                                <Route path={'/settings'} element={<Settings/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                            </Routes>
                        </Suspense>
                    </main>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
})
const AppContainer = connect(mapStateToProps, {initializeApp})(App);

const AppContainerWrapper = () => {
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
