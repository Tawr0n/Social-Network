import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const App = ({state, addPost, sendMessage, updateNewPostText, updateNewMessageText}) => {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header/>
                <Sidebar sidebar={state.sidebar}/>
                <main className={'content'}>
                    <Routes>
                        <Route path={'/*'} element={<Profile profilePage={state.profilePage} addPost={addPost}
                                                             updateNewPostText={updateNewPostText}/>}/>
                        <Route path={'/messages'}
                               element={<Messages messagesPage={state.messagesPage} sendMessage={sendMessage}
                                                  updateNewMessageText={updateNewMessageText}/>}>
                            <Route path={'/messages/*'} element={<Messages/>}/>
                        </Route>
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
