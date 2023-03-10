import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import Preloader from "./components/UI/Preloader/Preloader";
import {addGlobalError, initializeApp, removeGlobalError} from "./redux/appReducer";
import store from "./redux/reduxStore";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));

class App extends Component {
    catchAllUnhandledErrors = (e) => {
        let errorMessage = e.message ? e.message : e.reason.message;
        this.props.addGlobalError(errorMessage)
        toast.error(errorMessage)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
        window.addEventListener("error", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
        window.removeEventListener("error", this.catchAllUnhandledErrors)
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
                                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                                <Route path="*" element={<div style={{color: "red", padding: "10px"}}>404 not
                                    found</div>}/>
                            </Routes>
                        </Suspense>
                    </main>
                    {this.props.globalErrors.length > 0 &&
                        <ToastContainer
                            onClose={() => this.props.removeGlobalError()}
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized,
    globalErrors: state.app.globalErrors
})
const AppContainer = connect(mapStateToProps, {initializeApp, addGlobalError, removeGlobalError})(App);

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
