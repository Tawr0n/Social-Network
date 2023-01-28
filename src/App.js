import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = ({state}) => {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header/>
                <Sidebar sidebar={state.sidebar}/>
                <main className={'content'}>
                    <Routes>
                        <Route path={'/*'} element={<Profile/>}/>
                        <Route path={'/messages'} element={<MessagesContainer/>}>
                            <Route path={'/messages/*'} element={<MessagesContainer/>}/>
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
