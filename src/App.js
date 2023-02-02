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

const App = ({state}) => {
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
                    </Routes>
                </main>

            </div>
        </div>
    );
}

export default App;
