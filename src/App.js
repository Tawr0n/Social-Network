import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./components/UI/Preloader/Preloader";
import {initializeApp} from "./redux/appReducer";

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
                    </main>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
})
export default connect(mapStateToProps, {initializeApp})(App);
